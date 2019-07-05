/// <reference path="../../references.ts" />
type bloodhoundPrepare = { dataType: string, url: string };

class sceltacategoria extends Page {

    private _categoriesDictionary: { [key: string]: string };

    constructor() {
        super("scelta-categoria.html");
    }

    public onLoad(): void {
        super.onLoad();
        
        //if (dev.preset === "single") {
        //    $("[name=address]").val("brescia");
        //    this._categoriesDictionary = { "Ristorante": "RS01" };
        //    $("#category").val("Ristorante");
        //    $("[name=businessName]").val("lorenzaccio");
        //} else if (dev.preset === "multi") {
        //    $("[name=address]").val("milano");
        //    this._categoriesDictionary = { "Tavola calda": "RS05" };
        //    $("#category").val("Tavola calda");
        //    $("[name=businessName]").val("panini durini");
        //}

        this.removeDuplicatedFields();

        // Form principale
        this.html.find("form:first").submit(this.formSubmit.bind(this));
        // Form di selezione multipla
        this.html.find("#popup-multi form").submit(this.popupSubmit.bind(this));
        this.html.on("click", "[data-nocategory]", this.noCategoryClick.bind(this));

        this.html.find("[data-agency]").text(this.userSession.agencyInfo.agency.AgencyDescription);
    }

    public onNavigatedTo(): void {
        super.onNavigatedTo();
        this.sidebar.changeMode(SidebarMode.Unavailable);
        this.removeDuplicatedFields();
    }

    private removeDuplicatedFields(): void {
        if (this.userSession.isFlow2 === true) {
            this.html.find("[data-row-flow1]").remove();
        }
        else {
            this.html.find("[data-row-flow2]").remove();
        }
    }

    private noCategoryClick(e: JQueryEventObject): void {
        e.preventDefault();
        
        let address = this.html.find("[name=address]").val();
        let businessName = this.html.find("[name=businessName]").val();
        this.searchPdv(businessName, undefined, address);
    }

    private popupSubmit(e: JQueryEventObject): void {
        e.preventDefault();

        this.html.find("#popup-multi").modal("hide");

        let item: BaseLocationBindingResult = this.html.find(".slogan.selected").data("item");
        this.runAsync(async () => {
            this.userSession.businessName = item.Name;
            await this.userSession.addPdv(item);
            this.gotoNextStep();
        });
    }

    private gotoNextStep(): void {
        this.userSession.objective = (<any>EvaluationObjective)[$(".selected[data-objective]").data("objective")];
        this.userSession.objectiveDescription = $(".selected[data-objective] p:first").text();

        if (!this.userSession.businessCategoryId)
            this.userSession.businessCategoryId = "No cat";

        if (this.userSession.isFlow2) {
            this.navigo.navigate("scelta-prodotto");
        } else {
            this.navigo.navigate("prodotto-obiettivo");
        }     
    }

    private searchPdv(businessName: string, businessCategoryId: string | undefined, address: string): void {
        this.userSession.clear();
        this.userSession.businessCategoryId = businessCategoryId;
        this.userSession.businessName = businessName;
        this.userSession.searchText = businessName;

        this.runAsync(async () => {
            let semanticWebServiceAgent = ServiceAgentFactory.get(SemanticWebServiceAgent);
            let result: BaseLocationBindingResults = await semanticWebServiceAgent.searchLocation(address, this.userSession.businessName);

            this.userSession.clear();
            // TODO: gestire badwords
            if (result.Results.length > 0) {

                // Scelta risultati multipli
                if (result.Results.length > 1) {
                    this.renderTemplateScript("slogan-list-template", result.Results);
                    this.html.find(".slogan").each((i, e) => {
                        $(e).data("item", result.Results[i]);
                    });
                    // Seleziono il primo
                    this.html.find(".slogan").first().trigger('click');

                    // Mostro la modale
                    this.html.find("#popup-multi").modal("show");
                } else {
                    await this.userSession.addPdv(result.Results[0]);
                    this.gotoNextStep();
                }
            } else {
                this.showAlert("Non trovato", "Nessuna insegna trovata");
            }
        });
    }

    private formSubmit(e: JQueryEventObject): void {
        e.preventDefault();

        let address = $(e.target).find("[name=address]").val();
        let businessName = $(e.target).find("[name=businessName]").val();

        if (this.userSession.isFlow2 === false) {
            let businessCategoryId = this._categoriesDictionary[$("#category").val()];
            // Categoria obbligatoria, in questo caso
            if (!businessCategoryId) {
                this.html.find("#category").focus();
                return;
            }
            this.searchPdv(businessName, businessCategoryId, address);
        }
        else {
            this.searchPdv(businessName, undefined, address);
        }
    }

    public prepareCategoryBloodhound(query: string, prepare: bloodhoundPrepare): bloodhoundPrepare {
        prepare.url += encodeURIComponent(query) + "?$top=50";

        return prepare;
    }

    public transformCategoryBloodhound(categories: BusinessCategory[]): any {
        let result: any = {};
        this._categoriesDictionary = {};
        categories.forEach(v => {
            result[v.BusinessCategoryId] = v.BusinessCategoryDescription;
            this._categoriesDictionary[v.BusinessCategoryDescription] = v.BusinessCategoryId;
        });

        return result;
    }

    public selectedCategoryBloodhound(obj: any, datum: string): void {
        console.log(this._categoriesDictionary[datum]);
    }
}