/// <reference path="../../references.ts" />

class bulkriepilogo extends campagnaBase {

    private selectedPdv: Pdv;

    constructor() {
        super("bulk-riepilogo.html");
    }

    public onLoad() {
        super.onLoad(true);
        this.html.find("[data-page-ordine-panel]").click(this.processPayment.bind(this));
        this.renderTemplateScript("riepilogo-bulk", {
            AgencyName: this.userSession.agencyInfo.agency!.AgencyDescription,
            AgencyPhone: this.userSession.agencyInfo.agency!.AgencyReferralPhoneNumber,
            ReferentName: this.userSession.agencyInfo.agency!.AgencyReferralFirstName,
            ReferentSurame: this.userSession.agencyInfo.agency!.AgencyReferralLastName,
            ReferentEmail: this.userSession.agencyInfo.agency!.AgencyReferralEmail,
            BusinessName: this.userSession.businessName,
            ProductDesc: this.userSession.advertisementTypeDescription,
            TargetName: this.userSession.pdvs[0].reachWording,
            Target: this.userSession.pdvs.Sum(c => c.selectedProduct!.item.Value).toLocaleString(),
            Budget: this.userSession.bulkData.flow === BulkFlow.High
                ? (+this.userSession.pdvs.Sum(c => c.products[0].item.Price)).toPriceFormat()
                : (+this.userSession.bulkData.budget).toPriceFormat(),
            StartDate: moment(this.userSession.campaignStartDate).userLocale().format("ddd, D MMMM YYYY"),
            EndDate: moment(this.userSession.bulkData.EndDate).userLocale().format("ddd, D MMMM YYYY"),
            TotalPdv: this.userSession.pdvs.length,
            TotalCde: this.userSession.pdvs.length,
        })

        this.renderTemplateScript("riepilogo-bulk-ordine", {
            formattedTotalVatPrice: this.userSession.totalVatPrice.toPriceFormat(),
            formattedTotalPrice: this.userSession.formattedTotalPrice,
            formattedVat: (this.userSession.totalVatPrice - this.userSession.totalPrice).toPriceFormat()
        })

        this.selectedPdv = this.userSession.pdvs[0];
        this.updateBanners();
    }

    private getCustomName(p: Pdv): string {
        return `${p.detail.Name } ${moment(this.userSession.campaignStartDate).format("L")}`;
    }

    private getPdvDraft(p: Pdv): SaveCampaignDraftRequestBase {
        let customName = this.getCustomName(p);

        return ({
            SearchText: this.userSession.searchText || this.userSession.businessName,
            ProposalItemId: p.proposal.Id,
            ProposalCopyItemId: (this.userSession.selectedCopyItem) ? this.userSession.selectedCopyItem.Id : undefined,
            ProposalProductItemId: (p.selectedProduct) ? p.selectedProduct.item.Id : undefined,
            BannerCode: p.session.selectedBannerId,
            ProductDescription: this.userSession.productDescription,
            Discount: this.userSession.discount,
            BusinessName: this.userSession.businessName,
            Address: p.address,
            MobilePhone: p.phoneNumber,
            BusinessCategoryId: this.userSession.businessCategoryId,
            StartDate: this.userSession.campaignStartDate,
            Budget: p.selectedProduct!.item.Price,
            Locations: [{ Latitude: p.location.lat, Longitude: p.location.lng }],
            Objective: this.userSession.objective,
            Website: p.detail.Website,
            FacebookPage: p.detail.Url,
            DisplayUrl: "",
            CampaignCustomName: customName,
            Headline: "",
            Row1: "",
            Row2: "",
            Title: "",
            Description: "",
            CustomKeywords: [],
            ButtonLink: p.uriClickToMap,
            CtcLink: p.clickToCall,
            CustomBanners: p.getCustomBannerUris(),
            TailoredBanners: this.userSession.getTailoredCustomContentsUris(),
            AddressComponent: {
                Address: p.geocodeAddressCDE!.Address,
                City: p.geocodeAddressCDE!.City,
                Country: p.geocodeAddressCDE!.Country,
                FormattedAddress: p.geocodeAddressCDE!.FormattedAddress,
                Location: p.geocodeAddressCDE!.Location,
                PlaceId: p.geocodeAddressCDE!.PlaceId,
                PostalCode: p.geocodeAddressCDE!.PostalCode,
                Province: p.geocodeAddressCDE!.Province,
                Region: p.geocodeAddressCDE!.Region,
                StreetNumber: p.geocodeAddressCDE!.StreetNumber
            },
            BulkLandingUrl: p.bulkLandingUrl,
            BulkTrackingPixel: p.bulkTrackingPixel,
            IsBulk: true,
            Cluster: p.detail.Cluster,
            Radius: p.detail.Radius,
            BulkFlow: this.userSession.bulkData.flow,
            ProposalBulkId: this.userSession.bulkData.proposalBulkId
        });
    }

    private processPayment(e: JQueryEventObject): void {
        e.preventDefault();

        this.runAsync(async () => {
            let campaignServiceAgent = ServiceAgentFactory.get(CampaignServiceAgent);

            // Salvo le campagne
            let campaignGroupId = await campaignServiceAgent.bulkPrepareCampaign({
                Campaigns: this.userSession.pdvs.map(p => this.getPdvDraft(p))
            });


            // Salvo il cookie utilizzato poi dalla pagina di conferma
            if ($.cookie) {
                $.cookie("lastCampaignGroup", JSON.stringify({ customName: this.userSession.getCustomName, campaignGroupId: campaignGroupId }));
            }

            // Avvio il pagamento
            this.navigo.navigate("pagamento-completato");
        });

    }

    private updateBanners(): void {
        this.html.find("[data-banner-size]").each((i, e) => {
            let $e = $(e);
            let s: BannerSize = (<any>BannerSize)[($e.data("banner-size") as string)];
            let uri = this.selectedPdv.getBannerUri(s);

            $e.attr("src", uri);
        });
    }
}