/// <reference path="../../references.ts" />

class riepilogopdv extends Page {

    private selectedPdv: Pdv | undefined;
    public onUpdatePdv: (mapItem: MapItem) => void;
    public pdvs: Pdv[] | undefined;

    constructor() {
        super("riepilogo-pdv.html");
    }

    public onLoad(): void {
        super.onLoad();

        if (this.userSession.agencyInfo.askedCredit) {
            // imposto anticipo credito su complete
            this.html.find(".anticipo_credito").addClass('complete');
            // elimino il bordo rosso sul prezzo
            this.html.find(".endprice").removeClass('pricef');
        }

        this.html.on("click", "[data-ask-credit]", e => {
            e.preventDefault();

            this.html.find("[data-budget-warning]").popover("hide");
            this.html.find("#credit").modal('show');
        });

        this.html.find("#creditsRequest").click(async e => {

            let euroAmount = this.userSession.totalVatPrice - this.userSession.agencyInfo.balance;

            let serviceAgent = ServiceAgentFactory.get(AgencyServiceAgent);
            let button = $(e.target);
            button.button('loading');
            // Invoco il servizio per chiedere il credito
            await this.runAsync(async () => {
                await serviceAgent.askCredit({ EuroAmount: euroAmount });
                this.userSession.agencyInfo.askedCredit = true;
            }, undefined, false);
            button.button('reset');

            // Chiudo la modale
            this.html.find("#credit").modal('hide');
            
            // imposto anticipo credito su complete
            this.html.find(".anticipo_credito").addClass('complete');
            // elimino il bordo rosso sul prezzo
            this.html.find(".endprice").removeClass('pricef');
            
            // Continuo sugli scenari
            //this.navigo.navigate("seleziona-scenari");
            
            // riabilito il tasto conferma
            this.html.find("a[data-navigo]").removeClass('disabled');
        });

        this.renderPdvTotals();

        this.pdvs = this.userSession.pdvs;
        this.pdvs.forEach(v => (<any>v).potentialUsersString = v.detail.PotentialUsers.toLocaleString());
        this.pdvs.forEach(v => (<any>v).formattedMaleStatsString = (+v.formattedMaleStats).toLocaleString());
        this.pdvs.forEach(v => (<any>v).formattedFemaleStatsString = (+v.formattedFemaleStats).toLocaleString());
        this.pdvs.forEach(v => (<any>v).showCompetitorsRanking = v.session.businessCategoryId == undefined || v.session.businessCategoryId == "No cat" ? false : true);
        this.pdvs.forEach(v => (<any>v).competitorsRanking = (v.mapItem.insights.data.Competitors <= v.mapItem.insights.data.Ranking[0]) ? "< " + v.mapItem.insights.data.Ranking[0] :
            v.mapItem.insights.data.Competitors > v.mapItem.insights.data.Ranking[0] + 1 && v.mapItem.insights.data.Competitors <= v.mapItem.insights.data.Ranking[1] ? (v.mapItem.insights.data.Ranking[0] + 1) + " - " + v.mapItem.insights.data.Ranking[1]
                : "> " + v.mapItem.insights.data.Ranking[2]);

        this.renderTemplateScript("pdvs-template", { pdvs : this.pdvs });
    }

    public onNavigatedTo(): void {
        super.onNavigatedTo();
        this.sidebar.changeMode(SidebarMode.ReadOnly);
        if (this.sidebar.isOpen) {
            this.sidebar.toggle();
        }
    }

    public get hasNotEnoughBudget(): boolean {
        if (this.userSession.agencyInfo.askedCredit == undefined || this.userSession.agencyInfo.askedCredit == false) {
            return this.userSession.agencyInfo.canAskCredit && this.userSession.agencyInfo.balance < this.userSession.totalVatPrice;
        }
        else {
            return false;
        }
        
    }

    public get budgetNeed(): string {
        return (Math.round((this.userSession.totalVatPrice - this.userSession.agencyInfo.balance) * 100) / 100).toLocaleString();
    }

    public get budgetNeedActions(): string[] {
        if (!this.budgetNeed) return [];

        let list = [];
        if (this.userSession.agencyInfo.canAskCredit) {
            list.push("<a href='#' data-ask-credit>Richiedere un Anticipo Credito</a>");
        }
        list.push("Diminuire i budget per PdV");
        list.push("Eliminare 1 o più PdV");

        return list.map((v, i) => (i + 1) + " - " + v);
    }

    public pdiShowBudget(id: string): void {
        let pdv = this.userSession.getPdvById(id);
        this.selectedPdv = pdv;
        if (!pdv) return;

        // Mostro la lista dei prodotti
        this.renderTemplateScript("rproducts-template", pdv.getProductsGrouped(6, this.userSession.gender));
    }   

    public budgetSelected(id: string) {
        if (!this.selectedPdv) return;

        this.selectedPdv.selectedProduct = this.selectedPdv.products.First(p => p.item.Id === id);

        let temp = $(this.getTemplateScript("pdvs-template", { pdvs: this.pdvs }));
        // Sostituisco l'intestazione del pdv nella lista
        let heading: JQuery = temp.find("[data-pdi-id]").filter((i, e) => $(e).data("pdi-id") == this.selectedPdv!.id).find(".panel-heading");
        this.html.find(`[data-pdi-id='${this.selectedPdv.id}'] .panel-heading`).empty().append(heading.children());

        // Aggiorno i totali
        this.renderPdvTotals();
    }

    public pdiRemoved(id: string) {
        let pdv = this.userSession.getPdvById(id);
        if (pdv) {
            this.userSession.removePdv(pdv);
        }
        
        if (this.userSession.pdvs.length == 0) {
            this.navigo.navigate("scelta-categoria");
        }
        else {
            // Aggiorno lato mappa
            if (this.onUpdatePdv) {
                for (let p of this.userSession.pdvs) {
                    this.onUpdatePdv(p.mapItem);
                }
            }

            // Aggiorno i totali
            this.renderPdvTotals();
        }
    }
    /*
    public preparePlugin(plugin: any): void {
        for (let pdv of this.userSession.pdvs) {
            let mapItem = { ...pdv.mapItem, duplicable: false, editable: false, resettable: false, circle: {lat:pdv.location.lat,lng:pdv.location.lng}  };
            // Il nuovo centro è la posizione individuata nella pagina precedente
            // l'utente può avere spostato il cerchio      
            mapItem.lat = pdv.location.lat;
            mapItem.lng = pdv.location.lng;   
            plugin.actions("add", false, mapItem);
        }
    }
    */
    public preparePlugin(plugin: any): void {
        // location.lat è la circonferenza
        // originLocation è il pdv (marker)
        for (let pdv of this.userSession.pdvs) {
            let mapItem = { ...pdv.mapItem, duplicable: false, editable: false, resettable: false, circle: {lat:pdv.location.lat,lng:pdv.location.lng}  };
            // Il nuovo centro è la posizione individuata nella pagina precedente
            // l'utente può avere spostato il cerchio
            mapItem.lat = pdv.originalLocation.lat;
            mapItem.lng = pdv.originalLocation.lng;
            plugin.actions("add", false, mapItem);
        }
    }

    private renderPdvTotals(): void {
        this.renderTemplateScript("pdvTotals-template");
        // Posso proseguire se ho abbastanza budget e se ho almeno un pdv
        this.html.find("a[data-navigo]").toggleClass("disabled", this.hasNotEnoughBudget && this.userSession.pdvs.length > 0);
    }
}