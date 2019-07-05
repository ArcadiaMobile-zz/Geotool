/// <reference path="../../references.ts" />
class errore extends Page {
    constructor() {
        super("errore.html");
    }

    public onNavigatedTo(): void {
        super.onNavigatedTo();
        this.sidebar.changeMode(SidebarMode.Unavailable);
    }

    public onLoad(): void {
        super.onLoad();

        let query = document.location!.href.parseQuery();

        this.html.find("[data-title]").text(query.title || "Errore");
        this.html.find("[data-description]").text(query.description || "Si è verificato un errore imprevisto");
    }
}