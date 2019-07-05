/// <reference path="../../references.ts" />

class bulkcreativita extends campagnaBase {

    private selectedPdv: Pdv;

    constructor() {
        super("bulk-creativita.html");
    }

    public onLoad() {
        super.onLoad(true);
        this.selectedPdv = this.userSession.pdvs[0];
        let banners = this.getVisibleBannerIndexes(true);

        //this.html.find("[data-image]").attr('src', this.userSession.pdvs[0].mapItem.image);

        this.html.find("[data-file]").each((i, e) => {
            let div = $(e);
            // Rimuovo tutti gli upload che non contengono gli indici
            if (!banners.Contains(parseInt(div.data("file")))) {
                div.remove();
            }
        });

        this.userSession.manualData.isSet = true;
        this.updateBanners();
    }

    public dropzoneComplete(xhr: XMLHttpRequest, size: BannerSize): void {
        let set: Map<BannerSize, string>;

        set = this.userSession.manualData.customBanners;

        if (xhr.status === 200) {
            set.set(size, JSON.parse(xhr.responseText).TempUri);
        } else {
            set.delete(size);
        }

        this.updateBanners();
    }

    public dropzoneRemove(size: BannerSize): void {
        let set: Map<BannerSize, string>;

        set = this.userSession.manualData.customBanners;

        set.delete(size);
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
    }

}