/// <reference path="../../references.ts" />

class personalizzacampagnacreativita extends campagnaBase {
    private selectedPdv: Pdv;   

    constructor() {
        super("personalizza-campagna-creativita.html");
    }

    public onLoad(): void {
        super.onLoad();

        this.userSession.manualData.isSet = true;
        this.selectedPdv = this.userSession.pdvs[0];
        
        let banners = this.getVisibleBannerIndexes();

        this.html.find("[data-file]").each((i, e) => {
            let div = $(e);
            // Rimuovo tutti gli upload che non contengono gli indici
            if (!banners.Contains(parseInt(div.data("file")))) {
                div.remove();
            }
        });

        this.html.find('#add-graphic').on("cssClassChanged", () => {
            this.updateBanners();
        });
        
        if(this.userSession.advertisementType === AdvertisementType.SOCIALFB){ // facebook
            this.html.find('p.hide.facebook').removeClass('hide');
        }else if(this.userSession.advertisementType === AdvertisementType.SEARCHGOOGLE){ // google
            this.html.find('p.hide.google').removeClass('hide');
        }else{
            this.html.find('p.hide.app').removeClass('hide');
        }

        // Se cambia uno dei testi personalizzabili, aggiorno i banners
        this.html.find("[data-main-title],[data-main-description],[data-main-headline],[data-main-row1],[data-main-row2]").keyup(this.updateBanners.bind(this));

        this.renderTemplateScript("customUI-template");
        this.setClickToMap();
        this.setClickToCall();
    }

    public onNavigatedTo(): void {
        this.sidebar.changeMode(SidebarMode.Unavailable);
        this.selectedPdv = this.userSession.pdvs[0];

        this.setClickToMap();
        this.setClickToCall();
        this.updateBanners();
    }

    public goToRiepilogo(e: JQueryEventObject): void {
        e.preventDefault();

        this.setClickToMap();
        this.setClickToCall();
        this.updateBanners();

        this.navigo.navigate("riepilogo-campagna");
    }

    public dropzoneComplete(xhr: XMLHttpRequest, size: BannerSize, pdvIndex?: number): void {
        let set: Map<BannerSize, string>;
        if (typeof pdvIndex !== "undefined") {
            set = this.userSession.pdvs[pdvIndex].manualData.customBanners;
        } else {
            set = this.userSession.manualData.customBanners;
        }

        if (xhr.status === 200) {
            set.set(size, JSON.parse(xhr.responseText).TempUri);
        } else {
            set.delete(size);
        }      

        this.updateBanners();
    }

    public dropzoneRemove(size: BannerSize, pdvIndex?: number): void {
        let set: Map<BannerSize, string>;
        if (typeof pdvIndex !== "undefined") {
            set = this.userSession.pdvs[pdvIndex].manualData.customBanners;
        } else {
            set = this.userSession.manualData.customBanners;
        }

        set.delete(size);
        this.updateBanners();
    }

    public contactsCarouselChanged(index: number): void {
        this.selectedPdv = this.userSession.pdvs[index];
        this.updateBanners();
        this.html.find(".number").text(this.selectedPdv.number);
    }

    private updateBanners(): void {
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

        var title = this.html.find("[data-main-title]").val();
        var description = this.html.find("[data-main-description]").val();
        var headline = this.userSession.businessName + ' - ' + this.html.find("[data-main-headline]").val();
        var row1 = this.html.find("[data-main-row1]").val();
        var row2 = this.html.find("[data-main-row2]").val();
        var website = landingUrlAdmove + this.userSession.pdvs[0].seo.replace(/\d/, "XX");

        this.userSession.manualData.description = description;
        this.userSession.manualData.title = title;

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