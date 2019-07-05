/// <reference path="../../references.ts" />

class bulkpianificazione extends Page {

    private semanticServiceAgent: SemanticWebServiceAgent;
    private bulkData: BulkImportBindingResult[];
    private bulkDataError: BulkImportBindingResult[];

    constructor() {
        super("bulk-pianificazione.html");
    }

    public onLoad(): void {
        super.onLoad();
        this.userSession.clear();
        this.html.find("form").submit(this.formUploadFile.bind(this));
    }

    private async gotoConfigurazione(): Promise<void> {
        let semanticWebServiceAgent = ServiceAgentFactory.get(SemanticWebServiceAgent);
        const allDetails = await semanticWebServiceAgent.getBulkDetails(this.userSession.businessName, this.userSession.bulkData.proposalBulkId);

        for (let x = 0; x < this.bulkData.length; x++) {
            const item = this.bulkData[x];
            const detail = allDetails[x];
            await this.userSession.addBulkPdv(item.Label, item.AddressPDV!, item.AddressCDE!, item.LandingUrl, item.TrackingPixel, item.Level, item.GoogleId, detail);
        }

        this.navigo.navigate("bulk-configurazione");
    }

    private formUploadFile(e: BaseJQueryEventObject): void {
        e.preventDefault();

        this.runAsync(async () => {
            this.bulkData = [];
            this.bulkDataError = [];
            var formData = new FormData(<HTMLFormElement>this.html.find("form")[0]);

            this.semanticServiceAgent = ServiceAgentFactory.get(SemanticWebServiceAgent);
            let data = await this.semanticServiceAgent.GeocodeLocationFile(formData);

            this.userSession.bulkData.proposalBulkId = data.ProposalBulkId;
            this.userSession.bulkData.Landings = data.Results.Select(c => c.LandingUrl).Distinct();

            if (this.userSession.bulkData.Landings.First() == "") this.userSession.bulkData.Landings = [];

            this.userSession.businessName = $(e.target).find("[name=businessName]").val();
            this.userSession.businessCategoryId = "No cat";

            data.Results.forEach(c => c.Status ? this.bulkData.push(c) : this.bulkDataError.push(c));
            
            if (this.bulkDataError.length == 0) {
                this.html.closest('body').trigger('preloader',[this.bulkData.length]);
                await this.gotoConfigurazione();
            }
            else {
                this.renderTemplateScript("error-list-template", this.bulkDataError);
                this.html.find("[data-pdv-error]").text(this.bulkDataError.length);
                this.html.find("[data-pdv-total]").text(this.bulkData.length + this.bulkDataError.length);
                this.html.find("#popup-error").modal("show");
            }
        }, RunPolicy.Try, true, true);
    }

    public async updateAll(e: JQueryEventObject, divs: HTMLDivElement[]): Promise<void> {
        e.preventDefault();
        
        this.runAsync(async () => {
            for (let div of divs) {
                var googleId = div.children[0].attributes[1].nodeValue;
                var item = this.bulkDataError.FirstOrDefault(c => c.GoogleId == googleId);
                var address = (<HTMLInputElement>div.children[1]).value;

                if (address) {
                    this.semanticServiceAgent = ServiceAgentFactory.get(SemanticWebServiceAgent);
                    var newAddressComponent = await this.semanticServiceAgent.Geocode(this.userSession.bulkData.proposalBulkId, googleId!, address!);

                    if (newAddressComponent != null) {
                        if (!this.bulkData.Any(c => c.GoogleId == newAddressComponent!.PlaceId))
                            item!.GoogleId = newAddressComponent!.PlaceId;

                        item!.AddressCDE = newAddressComponent;
                        item!.Status = true;

                        this.bulkDataError.Remove(item!);
                        this.bulkData.push(item!);

                        this.html.find(e.target.parentElement!.parentElement!).addClass("done");
                    }  
                } 
            }

            if (this.bulkDataError.length == 0) {
                this.html.find("#popup-error").modal("hide");
                this.html.closest('body').trigger('preloader', [this.bulkData.length]);
                await this.gotoConfigurazione();
            }
            else {
                this.renderTemplateScript("error-list-template", this.bulkDataError);
                this.html.find("[data-pdv-error]").text(this.bulkDataError.length);
                this.html.find("[data-pdv-total]").text(this.bulkData.length + this.bulkDataError.length);
            }
        }, RunPolicy.Try, true, true);
    }

    public async updateRow(e: JQueryEventObject, googleId: string, address: string): Promise<void> {
        e.preventDefault();

        this.runAsync(async () => {
            var item = this.bulkDataError.FirstOrDefault(c => c.GoogleId == googleId);
            if (address) {
                this.semanticServiceAgent = ServiceAgentFactory.get(SemanticWebServiceAgent);
                var newAddressComponent = await this.semanticServiceAgent.Geocode(this.userSession.bulkData.proposalBulkId, googleId, address);

                if (newAddressComponent != null) {
                    if (!this.bulkData.Any(c => c.GoogleId == newAddressComponent!.PlaceId))
                        item!.GoogleId = newAddressComponent!.PlaceId;

                    item!.AddressCDE = newAddressComponent;
                    item!.Status = true;

                    this.bulkDataError.Remove(item!);
                    this.bulkData.push(item!);

                    this.html.find(e.target.parentElement!.parentElement!).addClass("done");

                    if (this.bulkDataError.length == 0) {
                        this.html.find("#popup-error").modal("hide");
                        this.html.closest('body').trigger('preloader', [this.bulkData.length]);
                        await this.gotoConfigurazione();
                    }
                    else {
                        this.renderTemplateScript("error-list-template", this.bulkDataError);
                        this.html.find("[data-pdv-error]").text(this.bulkDataError.length);
                        this.html.find("[data-pdv-total]").text(this.bulkData.length + this.bulkDataError.length);
                    }
                }  
            } 
        }, RunPolicy.Try, true, true);
    }
}