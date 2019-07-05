/// <reference path="../../references.ts" />

class prodottoobiettivo extends Page {
    constructor() {
        super("prodotto-obiettivo.html");
    }

    public onLoad(): void {
        super.onLoad();

        // Alcune categorie non sono consentite con Google
        if (["PH01"].findIndex(v => this.userSession.businessCategoryId == v) >= 0) {
            this.html.find("[data-type='SEARCHGOOGLE']").hide();
        }
    }

    onNavigatedFrom(): void {
        super.onNavigatedFrom();

        this.userSession.advertisementType = (<any>AdvertisementType)[$(".selected[data-type]").data("type")];
        this.userSession.advertisementTypeDescription = $(".selected[data-type] .panel-heading").text();

        if (this.userSession.isFlow2 === false) {
            this.userSession.objective = (<any>EvaluationObjective)[$(".selected[data-objective]").data("objective")];
            this.userSession.objectiveDescription = $(".selected[data-objective] p:first").text();
        }
    }

    onNavigatedTo(): void {
        super.onNavigatedTo();
        this.sidebar.changeMode(SidebarMode.Unavailable);
    }
}