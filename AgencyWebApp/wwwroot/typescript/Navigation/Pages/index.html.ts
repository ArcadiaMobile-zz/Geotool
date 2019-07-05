/// <reference path="../../references.ts" />
class index extends Page {
    constructor() {
        super("index.html");
    }

    public onNavigatedTo(): void {
        super.onNavigatedTo();
        this.sidebar.changeMode(SidebarMode.Unavailable);
    }

    public onLoad(): void {
        super.onLoad();

        $("[data-page-login]").click(e => {
            e.preventDefault();

            document.location!.href = getLoginUrl();
        });
      
    }
}