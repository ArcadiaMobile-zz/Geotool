interface CampaignServiceAgent {
    getAll(): Promise<CampaignBinding[]>;
    get(id: string): Promise<CampaignBinding>;
    moreProducts(proposalItemId: string, diagnosticData?: boolean): Promise<ProposalItem>;
    moreProductsBulk(request: MoreProductsBulkRequest): Promise<PointBulk[]>;
    moreCopyItems(proposalProductItemId: string): Promise<ProposalProductItem>;
    moreBanners(proposalCopyItemId: string): Promise<ProposalCopyItem>;
    evaluate(request: EvaluateRequest): Promise<Proposal>;
    evaluateBulk(): Promise<Proposal>;
    prepareCampaignGroupDraft(request: SaveCampaignGroupDraftRequest): Promise<SaveCampaignGroupDraftResponse>;
    bulkPrepareCampaign(request: BulkCampaignRequest): Promise<string>;
    handleCampaignPayment(campaignOrGroupId: string, paymentMethodId?: string): Promise<HandleCampaignPayment>;
    renameCampaign(campaignGroupId: string, newName: string): Promise<void>;
    getSeo(businessName: string): Promise<string>;
    getDeliveryDays(budget: number): Promise<number[]>;
    getBulkMaxBudget(): Promise<number>;
}

class CampaignServiceAgent extends AutoServiceAgent<CampaignServiceAgent> {
    constructor(context: ServiceAgentContext) {
        super(context,
            { name: "getAll", uri: "/api/Campaign" },
            { name: "get", uri: args => this.formatUri("/api/Campaign", args) },
            { name: "moreProducts", uri: args => this.formatUri("/api/Campaign/MoreProducts", [], { proposalItemId: args[0], diagnosticData: args[1] || false }) },
            { name: "moreProductsBulk", method: "POST", uri: args => this.formatUri("/api/Campaign/MoreProductsBulk"), body: args => args[0] },
            { name: "moreCopyItems", uri: args => this.formatUri("/api/Campaign/MoreCopyItems", [], { proposalProductItemId: args[0] }) },
            { name: "moreBanners", uri: args => this.formatUri("/api/Campaign/MoreBanners", [], { proposalCopyItemId: args[0] }) },
            { name: "evaluate", method: "POST", uri: args => this.formatUri("/api/Campaign/Evaluate"), body: args => args[0] },
            { name: "evaluateBulk", uri: "/api/Campaign/EvaluateBulk" },
            { name: "prepareCampaignGroupDraft", method: "POST", uri: args => this.formatUri("/api/Campaign/PrepareCampaignGroupDraft"), body: args => args[0] },
            { name: "bulkPrepareCampaign", method: "POST", uri: args => this.formatUri("/api/Campaign/BulkPrepareCampaign"), body: args => args[0] },
            { name: "handleCampaignPayment", method: "POST", uri: args => this.formatUri("/api/Campaign/HandleCampaignPayment", args) },
            { name: "renameCampaign", method: "POST", uri: args => this.formatUri("/api/Campaign/Rename", [args[0]]), body: args => JSON.stringify(args[1]) },
            { name: "getSeo", uri: args => this.formatUri("/api/Campaign/Seo", [], { businessName: args[0] }) },
            { name: "getDeliveryDays", method: "GET", uri: args => this.formatUri("/api/Campaign/Bulk/" + args[0], undefined, undefined)},
            { name: "getBulkMaxBudget", method: "GET", uri: "/api/Campaign/MaxBudget"}
        );

        if (dev.fakeCampaign) {
            this.evaluate = () => Promise.resolve(JSON.parse('{"Proposals":[{"ProposalInfo":{"CreatedOn":"2017-05-09T13:46:36.246397+00:00","Name":"","Description":"DISPLAYUU","Efficacy":1.0,"MinBudget":0.0,"MaxBudget":0.0},"Id":"ec13b17e65de40759e0deb5965d30b38","EstimatedDuration":"14.00:00:00","Tracing":"","ProposalType":"ProposalItem","AdvertisementType":"DISPLAYUU","CampaignProviderId":"APPNEXUS","Products":[]},{"ProposalInfo":{"CreatedOn":"2017-05-09T13:46:36.246397+00:00","Name":"","Description":"SOCIALFB","Efficacy":0.9,"MinBudget":0.0,"MaxBudget":0.0},"Id":"9e53734547874c698359abb8a31fd497","EstimatedDuration":"14.00:00:00","Tracing":"","ProposalType":"ProposalItem","AdvertisementType":"SOCIALFB","CampaignProviderId":"FACEBOOK","Products":[]},{"ProposalInfo":{"CreatedOn":"2017-05-09T13:46:36.246397+00:00","Name":"","Description":"DISPLAYCLICK","Efficacy":0.8,"MinBudget":0.0,"MaxBudget":0.0},"Id":"764484b08ed049ed8634c59998833976","EstimatedDuration":"14.00:00:00","Tracing":"","ProposalType":"ProposalItem","AdvertisementType":"DISPLAYCLICK","CampaignProviderId":"APPNEXUS","Products":[]},{"ProposalInfo":{"CreatedOn":"2017-05-09T13:46:36.246397+00:00","Name":"","Description":"SEARCHGOOGLE","Efficacy":0.3,"MinBudget":0.0,"MaxBudget":0.0},"Id":"61b6dc80599146ae95014daf5b5360f7","EstimatedDuration":"14.00:00:00","Tracing":"","ProposalType":"ProposalItem","AdvertisementType":"SEARCHGOOGLE","CampaignProviderId":"GOOGLE","Products":[]},{"ProposalInfo":{"CreatedOn":"2017-05-09T13:46:36.246397+00:00","Name":"","Description":"SMS","Efficacy":0.2,"MinBudget":0.0,"MaxBudget":0.0},"Id":"3f619106feb14c709c52d9efc9840745","EstimatedDuration":"14.00:00:00","Tracing":"","ProposalType":"ProposalItem","AdvertisementType":"SMS","CampaignProviderId":"APPNEXUS","Products":[]}],"Tracing":null,"MobileUserRadius":1500,"CompetitorsNumber":20}'));
            this.moreProducts = () => Promise.resolve(JSON.parse('{"ProposalInfo":{"CreatedOn":"2017-06-06T08:20:48.2675292+00:00","Name":"","Description":"DISPLAYUU","Efficacy":1.0,"MinBudget":0.0,"MaxBudget":0.0},"Id":"c542f2ad36cc45dcb9491f16b2eec779","EstimatedDuration":"14.00:00:00","Tracing":"AdvertisementType: DISPLAYUU MobileUsers: 34508 MobileUserRadius: 3000 AreaType: Urbana ","ProposalType":"ProposalItem","AdvertisementType":"DISPLAYUU","CampaignProviderId":"APPNEXUS","Products":[{"Id":"AQc=","Price":180.00,"VAT":39.60,"EstimatedDuration":"30.00:00:00","Value":6000,"Description":"Descrizione prod - lorem ipsum - 7","CopyItems":[]},{"Id":"AQk=","Price":225.00,"VAT":49.50,"EstimatedDuration":"30.00:00:00","Value":7500,"Description":"Descrizione prod - lorem ipsum - 9","CopyItems":[]},{"Id":"AQs=","Price":300.00,"VAT":66.00,"EstimatedDuration":"30.00:00:00","Value":10000,"Description":"Descrizione prod - lorem ipsum - 11","CopyItems":[]},{"Id":"AQ0=","Price":450.00,"VAT":99.00,"EstimatedDuration":"30.00:00:00","Value":15000,"Description":"Descrizione prod - lorem ipsum - 13","CopyItems":[]}]}'));
            this.moreCopyItems = () => Promise.resolve(JSON.parse('{"Id":"AQc=","Price":180.00,"VAT":39.60,"EstimatedDuration":"30.00:00:00","Value":6000,"Description":"Descrizione prod - lorem ipsum - 7","CopyItems":[{"SuggestedTitle":"Ordina ciò che vuoi.","SuggestedDescription":"Il nostro menù è così vario che faremo fatica a proporti qualcosa che non corrisponda esattamente a ciò che desideri. Vieni a provarlo.","Id":"a407d88246b54818841d43138fec87c2","BannerIds":["IT.RS0100a.0101.0100-a501"]},{"SuggestedTitle":"C’è più gusto nella tradizione.","SuggestedDescription":"L’eccellenza a tavola non si trova dappertutto.Smetti di cercarla: ti proponiamo un menù che riscopre la tradizione, solo con ingredienti freschi e di stagione.","Id":"a67565a905ae4a879fce3ef7a59f7b68","BannerIds":["IT.RS0100a.0202.0100- a102"]},{"SuggestedTitle":"Autentico.Locale.Buono.","SuggestedDescription":"Ti proponiamo un’esperienza culinaria unica in una location d’eccezione.Riscopri il sapore dell’autenticità. Vieni a trovarci. ","Id":"ee57a7ab8b1a447f8149e94fbf7c4619","BannerIds":["IT.RS0100a.0303.0100-a203"]}]}'));
        }
        if (dev.fakeGeocodeAddress) {
            this.getSeo = () => Promise.resolve(JSON.parse('"anima-cozze"'));
        }
    }
}