/// <reference path="../../references.ts" />

abstract class campagnaBase extends Page {
    private semanticServiceAgent: SemanticWebServiceAgent;
    public pagerTooltips: string[];
    
    public onLoad(isBulk: boolean = false): void {
        super.onLoad();

        // Decido quali banner mostrare
        this.getPagerTooltips();

        let banners = this.getVisibleBannerIndexes(isBulk);
        let remover = (i: number, e: HTMLElement) => !banners.Contains(i);

        // Tolgo gli elementi HTML in eccesso
        this.pagerTooltips = this.pagerTooltips.filter((v, i) => banners.Contains(i));
        this.html.find(".item-preview-device, .item-preview-banner").filter(remover).remove();
        this.html.find(".switch-preview li").filter(remover).remove();
        this.html.find("[data-image-logo]").attr("src", this.userSession.pdvs[0].mapItem.image);
        this.html.find("[data-number-banner]").text((banners.length - (this.userSession.advertisementType === AdvertisementType.FLYER ? 1 : 2)) + " banner");
    }

    protected getPagerTooltips(): void {
        switch (this.relativeUri) {
            case "bulk-creativita.html":
            case "bulk-riepilogo.html":
                this.pagerTooltips = ['LANDING PAGE PER SMARTPHONE', 'LANDING PAGE PER TABLET', 'FORMATO RETTANGOLO MEDIO', 'FORMATO INTERSTITIAL', 'FORMATO LEADERBOARD SMARTPHONE', 'FORMATO LEADERBOARD TABLET'];
                break;
            default:
                this.pagerTooltips = ['FORMATO PUBBLICITARIO FACEBOOK', 'ANNUNCIO GOOGLE ADS', 'LANDING PAGE PER SMARTPHONE', 'LANDING PAGE PER TABLET',
                    'FORMATO RETTANGOLO MEDIO', 'FORMATO INTERSTITIAL', 'FORMATO LEADERBOARD SMARTPHONE', 'FORMATO LEADERBOARD TABLET'];
                break;
        };
    }

    protected getVisibleBannerIndexes(isBulk: boolean = false): number[] {
        // Indice delle tipologie di banner da mostrare
        let banners = [0, 1, 2, 3, 4, 5, 6, 7];

        switch (this.userSession.advertisementType) {
            case AdvertisementType.DISPLAYCLICK: case AdvertisementType.DISPLAYUU:
                banners = this.userSession.bulkData.Landings != undefined
                    ? (this.userSession.bulkData.Landings.length == 0 || !isBulk ? banners.slice(0, 6) : banners.slice(2, 6))
                    : banners.slice(2, 8);
                break;
            case AdvertisementType.SEARCHGOOGLE:
                banners = [1, 2, 3];
                break;
            case AdvertisementType.SOCIALFB:
                banners = [0, 2, 3];
                break;
            case AdvertisementType.FLYER:
                banners = isBulk ? (this.userSession.bulkData.Landings.length == 0 ? [0, 3] : [3]) : [2, 5];
                break;
        }

        return banners;
    }

    protected async verifyAddress(address: string): Promise<string> {
        this.semanticServiceAgent = ServiceAgentFactory.get(SemanticWebServiceAgent);
        let data = await this.semanticServiceAgent.GeocodeAddress(address);
        return data!.FormattedAddress.replace(", Italy", "").replace("/","-");
    }

    protected setClickToCall(): void {
        this.html.find("input[data-link-call]:checkbox").each((i, e) => {
            var t = $(e),
                isChecked = t.is(":checked"),
                box = t.closest('.calltoaction'),
                input = box.find('input[type=text]');
            
            if (isChecked)
                this.userSession.pdvs[i].clickToCallCustom = input.val() !== "" ? input.val() : null;
            else
                this.userSession.pdvs[i].clickToCallCustom = null;
        });
    }

    protected setClickToMap(): void {
        this.html.find("input[data-link-map]:checkbox").each((i, e) => {
            var t = $(e),
                isChecked = t.is(":checked"),
                box = t.closest('.calltoaction'),
                input = box.find('input[type=text]');

            if (isChecked)
                this.userSession.pdvs[i].clickToMapCustom = input.val();
            else
                this.userSession.pdvs[i].clickToMapCustom = null;
        });
    }

    protected get minCampaignDate(): Date {
        return moment().addWorkdays(this.userSession.workDays).userLocale().toDate();
    }

    protected get maxCampaignDate(): Date {
        return moment().userLocale().toDate().addDays(365);
    }

    protected datePickerSelect(date: Date): void {
        this.userSession.campaignStartDate = date;
    }
}

class personalizzacampagna extends campagnaBase {
    private selectedPdv: Pdv;

    constructor() {
        super("personalizza-campagna.html");
    }

    public onLoad(): void {
        super.onLoad();

        // Nome del prodotto non serve in caso di branding
        if (this.userSession.objective === EvaluationObjective.Branding) {
            this.html.find("[data-product-description]").remove();
        }

        // Personalizzazione sconto
        if (this.userSession.objective !== EvaluationObjective.PromotionDiscount) {
            this.html.find("[data-discount]").remove();
        }

        // Personalizzazione prodotto
        if (this.userSession.objective !== EvaluationObjective.PromotionPrice) {
            this.html.find("[data-price]").remove();
        }

        // Aggiorna l'anteprima
        //this.html.find("[data-update-banners]").click(e => {
        //    e.preventDefault();

        //    this.setCustomValues();
        //    this.setClickToCall();
        //    this.setClickToMap();
        //    this.updateBanners();

        //    this.updateNextButton();
        //});

        // TODO: solo su scenario 1 e 2
        this.html.find("[data-change-graphics]").click(e => {
            this.runAsync(async () => {
                // Baso tutto sul primo pdv
                let p = this.selectedPdv
                if (!p) return;

                let banners = await ServiceAgentFactory.get(CampaignServiceAgent).moreBanners(this.userSession.selectedCopyItem!.Id);
                var bannerSize = this.userSession.advertisementType == AdvertisementType.SOCIALFB ? BannerSize.Format1200x628
                    : this.userSession.advertisementType == AdvertisementType.FLYER ? BannerSize.Format320x480 : BannerSize.Format300x250; // Facebook: formato 1200x628 (3), Flyer: formato 320x480 (6) altrimenti 300x250 (0)
                let items = banners.BannerIds.map((p, i) => { return { Id: p, Uri: this.selectedPdv.getBannerUri(bannerSize, p) }; });

                this.renderTemplateScript("modal-change-graphics-template-alt1", items[1]);
                this.renderTemplateScript("modal-change-graphics-template-current", items[0]);
                this.renderTemplateScript("modal-change-graphics-template-alt2", items[2]);
            });
        });

        this.renderTemplateScript("customUI-template");
        this.setClickToMap();
        this.setClickToCall();
    }

    private updateNextButton(): void {
        // Abilitato o disabilito il pulsante scegli data
        this.html.find("#submitter").prop("disabled", this.switch());
    }

    private switch(): boolean {
        switch (this.userSession.objective) {
            case EvaluationObjective.Branding:
                return false;
            case EvaluationObjective.NewOffer:
                return (this.customProductDescription.val() === "" || this.customProductDescription.val() === "[il tuo prodotto qui]" || this.customProductDescription.val() === undefined);
            case EvaluationObjective.PromotionDiscount:
                return (this.customProductDescription.val() === "" || this.customProductDescription.val() === "[il tuo prodotto qui]" || this.customProductDescription.val() === undefined || this.customDiscount.val() === "" || this.customDiscount.val() === "[XX]" || this.customDiscount.val() === undefined);
            case EvaluationObjective.PromotionPrice:
                return (this.customProductDescription.val() === "" || this.customProductDescription.val() === "[il tuo prodotto qui]" || this.customProductDescription.val() === undefined || this.customPrice.val() === "" || this.customPrice.val() === "[XX]" || this.customPrice.val() === undefined);
            default:
                return false;
        }
    }

    public onNavigatedTo(): void {
        this.sidebar.changeMode(SidebarMode.Unavailable);
        this.selectedPdv = this.userSession.pdvs[0];

        this.customBusinessName.val(this.userSession.businessName !== this.userSession.originalBusinessName ? this.userSession.businessName : this.userSession.originalBusinessName);
        this.customProductDescription.val(this.userSession.productDescription!);
        this.customDiscount.val(this.userSession.discount!);
        this.customPrice.val(this.userSession.discount!);

        this.updateNextButton();
    }

    public goToRiepilogo(e: JQueryEventObject): void {
        e.preventDefault();

        this.setCustomValues();
        this.setClickToCall();
        this.setClickToMap();
        this.updateBanners();

        this.navigo.navigate("riepilogo-campagna");
    }

    private get customBusinessName(): JQuery {
        return this.html.find("#customBusinessName");
    }

    private get customProductDescription(): JQuery {
        return this.html.find("#customProductDescription");
    }

    private get customDiscount(): JQuery {
        return this.html.find("#customDiscount");
    }

    private get customPrice(): JQuery {
        return this.html.find("#customPrice");
    }

    private setCustomValues(): void {
        this.userSession.businessName = this.customBusinessName.val();
        this.userSession.discount = (this.userSession.objective === EvaluationObjective.PromotionPrice) ? this.customPrice.val() : this.customDiscount.val();
        this.userSession.productDescription = this.customProductDescription.val();
        this.updateNextButton();
    }

    public contactsCarouselChanged(index: number): void {
        this.selectedPdv = this.userSession.pdvs[index];
        this.updateBanners();
        this.html.find(".number").text(this.selectedPdv.number);
    }

    public updateBanners(): void {
        this.html.find("[data-banner-size]").each((i, e) => {
            let $e = $(e);
            let s: BannerSize = (<any>BannerSize)[($e.data("banner-size") as string)];
            let uri = this.selectedPdv.getBannerUri(s);

            if ($e.is("img")) {
                $e.attr("src", uri);
            } else {
                $e.attr("href", uri);
            }
        });

        var title = this.userSession.selectedCopyItem ? this.userSession.selectedCopyItem.SuggestedTitle : "";
        var description = this.userSession.selectedCopyItem ? this.userSession.selectedCopyItem.SuggestedDescription : "";
        var headline = (this.userSession.selectedCopyItem && this.userSession.businessName + ' | ' + (this.userSession.selectedCopyItem as SearchProposalCopyItem).SuggestedHeadline) || "";
        var row1 = (this.userSession.selectedCopyItem && (this.userSession.selectedCopyItem as SearchProposalCopyItem).SuggestedRow1) || "";
        var row2 = this.userSession.searchRow2Description;
        var website = landingUrlAdmove + this.userSession.pdvs[0].seo.replace(/\d/, "XX");

        // Facebook
        this.html.find("#slider-preview .title").textAndTitle(title);
        this.html.find("#slider-preview .description").textAndTitle(description);
        // Google
        this.html.find("#slider-preview .headline").textAndTitle(headline);
        this.html.find("#slider-preview .row1").textAndTitle(row1);
        this.html.find("#slider-preview .row2").textAndTitle(row2);
        this.html.find("#slider-preview .website").textAndTitle(website);
    }
}