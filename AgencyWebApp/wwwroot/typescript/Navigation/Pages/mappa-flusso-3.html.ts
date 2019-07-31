/// <reference path="../../references.ts" />
class mappaflusso3 extends Page {
    public onUpdatePdv: (mapItem: MapItem) => void;

    constructor() {
        super("mappa-flusso-3.html");
    }

    public onNavigatedTo(): void {
        super.onNavigatedTo();
        this.sidebar.changeMode(SidebarMode.Unavailable);
    }

    public onLoad(): void {
        super.onLoad();

        this.renderTemplateScript("business-template", {
            businessName: this.userSession.businessName,
            address: this.userSession.pdvs[0].address,
            phoneNumber: this.userSession.pdvs[0].phoneNumber,
            image: this.userSession.pdvs[0].detail.Categories[0].Category === "No cat" ? "/assets/img/logo.png" : this.userSession.pdvs[0].mapItem.image
        });
    }

    public updatePdi(id: string) {
        let pdv = this.userSession.getPdvById(id);
        if (!pdv) return;

        this.runAsync(async () => {
            await pdv!.load();
            if (this.onUpdatePdv) this.onUpdatePdv(pdv!.mapItem);
        });
    }

    public async pdiMoved(id: string, location: LocationCoordinates) {
        let pdv = this.userSession.getPdvById(id);
        if (pdv) {
            pdv.location = location;
            pdv.locationAddress = "-";

            try {
                var googleServiceAgent = new GoogleServiceAgent();
                pdv.locationAddress = (await googleServiceAgent.geocode(location)).formatted_address;
            }
            catch (e) {
                console.error(e);
            }
        }
    }

    public pdiReset(id: string): void {
        let pdv = this.userSession.getPdvById(id);
        if (!pdv) return;

        pdv.reset();

        this.runAsync(async () => {
            // Aggiorno gli insights
            await pdv!.load();
            if (this.onUpdatePdv) this.onUpdatePdv(pdv!.mapItem);
        });
    }
    public readinsightRadiusValues(radius: number): RadiusInsight | undefined {
        let insightradius = this.userSession.getinsightRadiusValues;
        let result = undefined;
        if (insightradius) {
            for (let i = 0; i < insightradius.Insights.length; i++) {
                if (insightradius.Insights[i].Radius === radius) {
                    result = insightradius.Insights[i];
                    break;
                }
            }
        }
        return result;
    }
}