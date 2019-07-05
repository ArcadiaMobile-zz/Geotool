/// <reference path="../../references.ts" />

class riepilogocampagna extends campagnaBase {

    private selectedPdv: Pdv;

    constructor() {
        super("riepilogo-campagna.html");
    }

    public onLoad(): void {
        this.renderTemplateScript("riepilogo-template");
        this.renderTemplateScript("riepilogo-template-2");
        this.renderTemplateScript("riepilogo-invoice-template");

        super.onLoad();

        //this.selectPicker.change(this.selectPickerChanged.bind(this));
        //this.selectPickerChanged();

        this.html.find("#invoice-form").validator();

        // processPayment parte tramite la form della fattura o tramite pulsante
        this.html.find("[data-page-ordine]").click(this.processPayment.bind(this));
        this.html.find("[data-page-ordine-panel]").toggle(!this.needInvoiceData);
        this.html.find(".approvingly").toggle(this.userSession.manualData.isSet);
        this.html.find("#invoice-form").submit(this.processPayment.bind(this));

        $('html, body, #page').trigger('click');
    }

    public onNavigatedTo(): void {
        super.onNavigatedTo();
        this.sidebar.changeMode(SidebarMode.ReadOnly);
    }

    public get formattedTotalVatPrice(): string[] {
        return this.userSession.totalVatPrice.toPriceFormat();    
    }

    public get formattedTotalPrice(): string[] {
        return this.userSession.tailored
            ? (this.userSession.totalPrice - 50).toPriceFormat() 
            : this.userSession.formattedTotalPrice;
    }

    public get formattedVat(): string[] {
        return (this.userSession.totalVatPrice - this.userSession.totalPrice).toPriceFormat();
    }

    public get needInvoiceData(): boolean {
        return this.userSession.agencyInfo.onlinePayment;
    }

    public get isSearchType(): boolean {
        return this.userSession.advertisementType === AdvertisementType.SEARCHGOOGLE;
    }
    /*
    public get selectPicker(): JQuery {
        return this.html.find(".selectpicker");
    }*/

    public get keywords(): string[] {
        let keywords: string[] = [];
        if (this.userSession.manualData.isSet) {
            keywords = this.userSession.manualData.keywords;
        }
        else {
            let searchCopyItem = this.userSession.selectedCopyItem as SearchProposalCopyItem;
            if (searchCopyItem.SuggestedKeywords) {
                keywords = searchCopyItem.SuggestedKeywords;
            }
        }
        return keywords;
    }

    public get formattedStartDate(): string {
        return moment(this.userSession.campaignStartDate).userLocale().format("ddd, D MMMM YYYY");
    }

    public get formattedEndDate(): string {
        let endDate = moment(this.userSession.campaignStartDate).add(moment.duration(this.userSession.pdvs.Select(c => c.selectedProduct && c.selectedProduct.item.EstimatedDuration).Max()));
        return moment(endDate).userLocale().format("ddd, D MMMM YYYY");
    }

    public get totalReach(): string {
        return this.userSession.pdvs.Sum(p => (p.selectedProduct) ? p.selectedProduct.item.Value : 0).toLocaleString();
    }

    public get texts(): string[] {
        if (this.userSession.advertisementType === AdvertisementType.SEARCHGOOGLE) {
            if (this.userSession.manualData.isSet) {
                return [this.userSession.manualData.headline, this.userSession.manualData.row1, this.userSession.manualData.row2];
            } else if (this.userSession.selectedCopyItem) {
                let search = this.userSession.selectedCopyItem as SearchProposalCopyItem;
                return [this.userSession.businessName + ' - ' + search.SuggestedHeadline, landingUrlAdmove + this.userSession.pdvs[0].seo.replace(/\d/, "XX"), search.SuggestedRow1, this.userSession.searchRow2Description];
            }
        }

        return [];
    }

    private processPayment(e: JQueryEventObject): void {
        e.preventDefault();

        if(this.html.find("#invoice-form").has('.has-error').length === 0) {

            this.runAsync(async () => {

                let campaignServiceAgent = ServiceAgentFactory.get(CampaignServiceAgent);

                // Salvo le campagne
                let response = await campaignServiceAgent.prepareCampaignGroupDraft({
                    Campaigns: this.userSession.pdvs.map(p => this.getPdvDraft(p))
                });

                // Salvataggio dei dati di fatturazione
                if (this.userSession.agencyInfo.onlinePayment) {
                    let invoiceServiceAgent = ServiceAgentFactory.get(InvoiceServiceAgent);
                    await invoiceServiceAgent.prepareForCampaignGroup(response.CampaignGroupId, {
                        Address: this.html.find("[name=address]").val(),
                        City: this.html.find("[name=citta]").val(),
                        CompanyName: this.html.find("[name=ragioneSociale]").val(),
                        InvoiceEmail: this.html.find("[name=email]").val(),
                        InvoiceVatCode: this.html.find("[name=piva]").val(),
                        PhoneNumber: this.userSession.agencyInfo.agency.AgencyReferralPhoneNumber,
                        PostalCode: this.html.find("[name=cap]").val(),
                        CountryId: 3574, // Italia
                        CouponCode: "",
                        State: "Italy",
                        // New invoice
                        SDICode: this.html.find("[name=SDICode]").val(),
                        InvoicePECMail: this.html.find("[name=PECMail]").val(),
                    });
                };

                // Salvo il cookie utilizzato poi dalla pagina di conferma
                if ($.cookie) {
                    $.cookie("lastCampaignGroup", JSON.stringify({ customName: this.userSession.getCustomName, campaignGroupId: response.CampaignGroupId }));
                }

                // Avvio il pagamento
                let paymentResponse = await campaignServiceAgent.handleCampaignPayment(response.CampaignGroupId);
                if (paymentResponse.RedirectUri) {
                    document.location!.href = paymentResponse.RedirectUri;
                } else {
                    this.navigo.navigate("pagamento-completato");
                }
            });
        }
    }

    //private getCustomName(): string {
    //    return `${this.userSession.originalBusinessName} ${moment(this.userSession.campaignStartDate).format("L")}`;
    //}

    private getPdvDraft(p: Pdv): SaveCampaignDraftRequestBase {
        return ({
            ProposalItemId: p.proposal.Id,
            ProposalCopyItemId: (this.userSession.selectedCopyItem) ? this.userSession.selectedCopyItem.Id : undefined,
            ProposalProductItemId: (p.selectedProduct) ? p.selectedProduct.item.Id : undefined,
            BannerCode: p.session.selectedBannerId,
            ProductDescription: this.userSession.productDescription,
            Discount: this.userSession.discount,
            SearchText: this.userSession.searchText,
            BusinessName: this.userSession.businessName,
            Address: (p.clickToMap == undefined || p.clickToMap == null) ? p.address : p.clickToMap,
            MobilePhone: p.phoneNumber,
            BusinessCategoryId: this.userSession.businessCategoryId,
            StartDate: this.userSession.campaignStartDate,
            Budget: p.selectedProduct!.item.Price,
            Locations: [{ Latitude: p.location.lat, Longitude: p.location.lng }],
            Objective: this.userSession.objective,
            Website: p.detail.Website,
            FacebookPage: p.detail.Url,
            DisplayUrl: landingUrlAdmove + p.seo,
            CampaignCustomName: (this.userSession.getCustomName.length < 100) ? this.userSession.getCustomName : this.userSession.getCustomName.slice(0, 100),
            Headline: (this.userSession.manualData.isSet && this.userSession.manualData.headline) || (this.userSession.selectedCopyItem && (this.userSession.selectedCopyItem as SearchProposalCopyItem).SuggestedHeadline) || "",
            Row1: (this.userSession.manualData.isSet && this.userSession.manualData.row1) || (this.userSession.selectedCopyItem && (this.userSession.selectedCopyItem as SearchProposalCopyItem).SuggestedRow1) || "",
            Row2: (this.userSession.manualData.isSet && this.userSession.manualData.row2) || this.userSession.searchRow2Description || "",
            Title: (this.userSession.manualData.isSet && this.userSession.manualData.title) || (this.userSession.selectedCopyItem ? this.userSession.selectedCopyItem.SuggestedTitle : ""),
            Description: (this.userSession.manualData.isSet && this.userSession.manualData.description) || (this.userSession.selectedCopyItem ? this.userSession.selectedCopyItem.SuggestedDescription : ""),
            CustomKeywords: (this.userSession.manualData.isSet && this.userSession.manualData.keywords) || [],
            ButtonLink: p.uriClickToMap,
            CtcLink: p.clickToCall,
            CustomBanners: p.getCustomBannerUris(),
            TailoredBanners: this.userSession.getTailoredCustomContentsUris(),
            IsBulk: false,
            Cluster: p.detail.Cluster,
            Radius: p.detail.Radius
        });
    }

    public selectPickerChanged(id: number): void {
        //console.log('id',id);
        this.selectedPdv = this.userSession.pdvs[id]; // (this.selectPicker.get(0) as HTMLSelectElement).selectedIndex
        this.renderTemplateScript("dettaglioRiepilogo-template", { Pdv: this.selectedPdv, isNotTailored: !this.userSession.tailored } );
        this.html.find(".number").text(this.selectedPdv.number);
        this.updateBanners();
    }

    private updateBanners(): void {
        this.html.find("[data-banner-size]").each((i, e) => {
            let $e = $(e);
            let s: BannerSize = (<any>BannerSize)[($e.data("banner-size") as string)];
            let uri = this.selectedPdv.getBannerUri(s);

            $e.attr("src", uri);
        });

        let draft = this.getPdvDraft(this.selectedPdv);
        var website = landingUrlAdmove + this.userSession.pdvs[0].seo.replace(/\d/, "XX");
        
        this.html.find("#slider-preview .title").textAndTitle(draft.Title);
        this.html.find("#slider-preview .description").textAndTitle(draft.Description);

        var headline = draft.BusinessName + ' | ' + draft.Headline;

        this.html.find("#slider-preview .headline").textAndTitle(headline);
        this.html.find("#slider-preview .row1").textAndTitle(draft.Row1);
        this.html.find("#slider-preview .row2").textAndTitle(draft.Row2);
        this.html.find("#slider-preview .website").textAndTitle(website);
        
    }
    
}