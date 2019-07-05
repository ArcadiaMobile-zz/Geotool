class Sidebar {

    constructor() {
        this.carouselPdiTemplate = $('#owl-dashboard .row.item:first').removeClass('hide').remove();
    }

    public changeMode(mode: SidebarMode): void {
        this.editAddress.hide();
        this.owlDashboard.hide();
        this.insights.hide();
        this.sidebarButton.hide();
        switch (mode) {
            case SidebarMode.Full:
                this.editAddress.show();
                this.owlDashboard.show();
                this.sidebarButton.show();
                this.insights.show();
                break;
            case SidebarMode.ReadOnly:
                this.sidebarButton.show();
                this.owlDashboard.show();
                this.insights.show();
                break;
            case SidebarMode.Hidden:
                this.sidebarButton.show();
                if (this.isOpen) {
                    this.toggle();
                }
                break;
            case SidebarMode.Unavailable:
                if (this.isOpen) {
                    this.toggle();
                }
                break;
        }
    }

    public carouselPdiTemplate: JQuery;

    public toggle(): void {
        $("#open-sidebar").click();
    }

    public get isOpen(): boolean {
        return $("#sidebar-dashboard").hasClass("open");
    }

    public get insights(): JQuery {
        return $("#insights");
    }

    public get sidebarButton(): JQuery {
        return $(".sidebar-button");
    }

    public get editAddress(): JQuery {
        return $("#editAddress");
    }

    public get locationAddress(): JQuery {
        return $("#locationAddress");
    }

    public get owlDashboard(): JQuery {
        return $("#owl-dashboard");
    }
}

enum SidebarMode {
    Unavailable,
    Hidden,
    ReadOnly,
    Full
}