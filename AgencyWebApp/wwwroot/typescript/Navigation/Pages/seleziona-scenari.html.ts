/// <reference path="../../references.ts" />

class selezionascenari extends Page {

    private copyItems: ProposalCopyItem[];

    constructor() {
        super("seleziona-scenari.html");
    }

    public onLoad(): void {

        super.onLoad();

        // Nascondi l'opzione creatività ADMove se è stato scelto "Altro" come obiettivo
        // Oppure se la categoria è sconosciuta
        if (this.userSession.objective == EvaluationObjective.AnotherTarget
            || !this.userSession.businessCategoryId || this.userSession.businessCategoryId == "No cat") {
            // Nascondi l'opzione creatività di AdMove
            this.html.find("[data-creativity-admove-container]").hide().find(".selected").removeClass("selected");
            // Pre-seleziona l'opzione creatività scelta dal cliente
            setTimeout(() => this.html.find("[data-creativity=LOADED]").click(), 1);
        }
        else {
            this.html.find("[data-creativity-admove-container]").show();
        }

        this.html.on("change", "input[type=radio]", e => {
            let id: string = e.currentTarget.id;
            this.userSession.selectedCopyItem = this.copyItems.First(c => c.Id == id);
            // Seleziono automaticamente il primo banner
            this.userSession.selectedBannerId = this.userSession.selectedCopyItem.BannerIds[0];
        });

        // Click su pulsante avanti
        this.html.find("[data-page-scenario]").click(() => {

            let selectedDiv = this.html.find("#scenario .selected[data-id]");
            let scenarioId: number = selectedDiv.data("id");

            // Calcolo i giorni di partenza della campagna
            this.userSession.workDays = parseInt(selectedDiv.data("time"));
            let today = moment().startOf("day");
            this.userSession.campaignStartDate = today.addWorkdays(this.userSession.workDays).toDate();

            // Se ho selezionato la creatività di ad-move
            switch (scenarioId) {
                case 1:
                    this.showToneOfVoice();
                    break;
                case 2:
                    this.navigo.navigate("personalizza-campagna-creativita");
                    break;
                case 3:
                    this.navigo.navigate("campagna-creativita-ad-hoc");
                    break;
            }
        });

        // Click su pulsante personalizza campagna
        this.html.find("[data-page-personalizza]").click(e => {
            e.preventDefault();

            this.toneOfVoiceModal.modal("hide");
            this.navigo.navigate("personalizza-campagna");
        });
    }

    public onNavigatedTo(): void {
        super.onNavigatedTo();
        this.sidebar.changeMode(SidebarMode.Unavailable);
        if (this.sidebar.isOpen) {
            this.sidebar.toggle();
        }

        // Resetto le informazioni manuali
        this.userSession.manualData.isSet = false;
        this.userSession.manualData.customBanners.clear();
        this.userSession.selectedCopyItem = undefined;
        this.userSession.selectedBannerId = undefined;
        this.userSession.tailored = false;
        this.userSession.productDescription = undefined;
        this.userSession.discount = undefined;
        this.userSession.businessName = this.userSession.originalBusinessName;
    }

    private get toneOfVoiceModal(): JQuery {
        return this.html.find("#tone-of-voice");
    }

    private showToneOfVoice(): void {
        this.runAsync(async () => {
            // Baso tutto sul primo pdv
            let p = this.userSession.pdvs[0].selectedProduct;
            if (!p) return;

            let product = await ServiceAgentFactory.get(CampaignServiceAgent).moreCopyItems(p.item.Id);
            this.copyItems = product.CopyItems;
            
            var bannerSize = this.userSession.advertisementType == AdvertisementType.SOCIALFB ? 3
                : this.userSession.advertisementType == AdvertisementType.FLYER ? 6 : 0; // Facebook: formato 1200x628 (3), Flyer: formato 320x480 (6) altrimenti 300x250 (0)
            
            let items = product.CopyItems.map((p, i) => ({
                ...p, Uri: "{0}/api/Banner/Preview/{1}/{2}/{3}/{4}/{5}/{6}/{7}".uriFormat(
                    baseUrl,
                    p.BannerIds[0],
                    bannerSize,
                    "[la tua insegna qui]",
                    this.userSession.pdvs[0].clickToMapCustom,
                    this.userSession.pdvs[0].clickToCallCustom,
                    "[XX]",
                    "[il tuo prodotto qui]")
            }));
            this.renderTemplateScript("tone-template", items);
            // Seleziono il primo elemento
            this.html.find("input[type=radio]:first").prop("checked", true).trigger("change");

            if (this.userSession.advertisementType === AdvertisementType.SEARCHGOOGLE) this.navigo.navigate("personalizza-campagna");
            else this.toneOfVoiceModal.modal("show");
        });
        
    }

    public getWorkDays(days: number): string {
        var d = moment().startOf("day");
        return moment(d.addWorkdays(days).toDate()).userLocale().format("dddd, D MMMM YYYY");
    }
}