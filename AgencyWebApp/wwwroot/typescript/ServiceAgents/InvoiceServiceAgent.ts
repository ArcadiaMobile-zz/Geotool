interface InvoiceServiceAgent {
    prepareForCampaign(campaignId: string, request: PrepareForCampaignRequest): Promise<string>;
    prepareForCampaignGroup(campaignGroupId: string, request: PrepareForCampaignRequest): Promise<string>;
    get(): Promise<Invoice[]>;
}

class InvoiceServiceAgent extends AutoServiceAgent<InvoiceServiceAgent> {
    constructor(context: ServiceAgentContext) {
        super(context,
            { name: "prepareForCampaign", method: "POST", uri: args => this.formatUri("/api/Invoice/PrepareForCampaign", [args[0]]), body: args => args[1] },
            { name: "prepareForCampaignGroup", method: "POST", uri: args => this.formatUri("/api/Invoice/PrepareForCampaignGroup", [args[0]]), body: args => args[1] },
            { name: "get", method: "GET", uri: "/api/Invoice" }
        );
    }
}