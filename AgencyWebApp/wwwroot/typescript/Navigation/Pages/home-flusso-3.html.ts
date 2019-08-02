/// <reference path="../../references.ts" />
class homeflusso3 extends Page {
    constructor() {
        super("home-flusso-3.html");
    }

    public onNavigatedTo(): void {
        super.onNavigatedTo();
        this.sidebar.changeMode(SidebarMode.Unavailable);

        this.userSession.clear();
    }

    public onLoad(): void {
        super.onLoad();

        // Form principale
        this.html.find("#main").submit(this.formSubmit.bind(this));
        // Form di selezione multipla
        this.html.find("#popup3-multi form").submit(this.popupSubmit.bind(this));
        // Imposto il nome dell'agenzia
       // this.html.find("[data-agency]").text(this.userSession.agencyInfo.agency.AgencyDescription);
    }

    private popupSubmit(e: JQueryEventObject): void {
        e.preventDefault();

        this.html.find("#popup3-multi").modal("hide");

        let item: BaseLocationBindingResult = this.html.find(".slogan.selected").data("item");
        this.runAsync(async () => {           
            await this.userSession.addPdv(item);
            this.navigo.navigate("mappa-flusso-3");
        });
    }

    private formSubmit(e: JQueryEventObject): void {
        if (!e.isDefaultPrevented()) {
            e.preventDefault();

            this.userSession.clear();
            this.userSession.businessName = this.userSession.searchText = this.html.find("[name=businessName]").val();
            this.userSession.flow3.address = this.html.find("[name=address]").val();
            this.userSession.flow3.radius = parseInt("1500");

            this.runAsync(async () => {
                let semanticWebServiceAgent = ServiceAgentFactory.get(SemanticWebServiceAgent);
                let result: BaseLocationBindingResults = await semanticWebServiceAgent.searchLocation(this.userSession.flow3.address || "", this.userSession.businessName);

                // TODO: gestire badwords
                if (result.Results.length != 0) {
                    //// Scelta risultati multipli
                    if (result.Results.length > 1) {
                        this.renderTemplateScript("slogan-list-template", result.Results);
                        this.html.find(".slogan").each((i, e) => {
                            $(e).data("item", result.Results[i]);
                        });
                        // Seleziono il primo
                        this.html.find(".slogan").first().trigger('click');

                        // Mostro la modale
                        this.html.find("#popup3-multi").modal("show");
                    } else {
                        await this.userSession.addPdv(result.Results[0]);
                        this.userSession.insightRadiusValues = await this.userSession.InsightRadiusAsync(result.Results[0].Geometry.location);
                        this.navigo.navigate("mappa-flusso-3");
                    }
                } else {
                    this.showAlert("Non trovato", "Nessuna insegna trovata");
                }
            });
        }
    }
}