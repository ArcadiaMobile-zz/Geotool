/// <reference path="../../references.ts" />
class sceltaflusso extends Page {
    constructor() {
        super("scelta-flusso.html");
    }

    public onNavigatedTo(): void {
        super.onNavigatedTo();
        this.sidebar.changeMode(SidebarMode.Unavailable);
    }

    public onLoad(): void {
        super.onLoad();

        this.html.find(".content-flusso").hide();
        
        this.runAsync(async () => {
            await this.userSession.agencyInfo.load();
            this.setNavigationLinks();

            this.html.find("[data-agency]").text(this.userSession.agencyInfo.agency.AgencyDescription);
            
            if(this.userSession.agencyInfo.onlinePayment == true)
                this.html.find(".flusso.col-lg-3").removeClass('col-lg-3').addClass('col-lg-4').filter(".bulk").remove();
            
            this.html.find(".content-flusso").fadeIn(100); 
            
        });
    }
}