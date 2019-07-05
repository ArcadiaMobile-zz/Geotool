/// <reference path="../../references.ts" />

class campagnacreativitaadhoc extends campagnaBase {

     constructor() {
        super("campagna-creativita-ad-hoc.html");
    }

    public onLoad(): void {
        super.onLoad();
    }

    public onNavigatedTo(): void {
        this.sidebar.changeMode(SidebarMode.ReadOnly);
    }

    public dropzoneComplete(xhr: XMLHttpRequest, type: string): void {
        if (xhr.status === 200) {
            this.userSession.tailoredCustomContents.set(type, JSON.parse(xhr.responseText).Uri);
        } else {
            this.userSession.tailoredCustomContents.delete(type);
        }
    }

    public dropzoneRemove(size: BannerSize, type: string): void {
        this.userSession.tailoredCustomContents.delete(type);
    }

    public goToRiepilogo(e: JQueryEventObject): void {
        e.preventDefault();

        this.userSession.productDescription = this.html.find("textarea").val();
        this.userSession.tailored = true;       
        
        this.navigo.navigate("riepilogo-campagna");
    }
}