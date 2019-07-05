interface ReportServiceAgent {
    groupsSummary(): Promise<ReportCampaignGroupsSummaryBinding>;
    groups(status?: CampaignStatusEnum, top?: number, skip?: number): Promise<ReportCampaignGroupBinding[]>;
    groupsCount(status?: CampaignStatusEnum): Promise<number>;
    campaigns(status: CampaignStatusEnum, top?: number, skip?: number): Promise<ReportCampaignBinding[]>;
    getCampaignById(id: string): Promise<ReportCampaignById>;
    getCampaignGroupById(id: string): Promise<ReportCampaignByGroupId>;
    getCampaignDetailsById(id: string): Promise<ReportCampaignDetailsById>;
    getCampaignDetailsByGroupId(id: string): Promise<ReportCampaignDetailsByGroupId>;
    getCampaignsModeration(): Promise<ReportCampaignsModerationBinding[]>;
    GetReportPowerBI(id: string): Promise<ReportPowerBI>;
}

class ReportServiceAgent extends AutoServiceAgent<ReportServiceAgent> {
    constructor(context: ServiceAgentContext) {
        super(context,
            { name: "groupsSummary", method: "GET", uri: "/api/report/groupssummary" },
            { name: "groups", method: "GET", uri: args => this.formatUri("/api/report/groups", undefined, { status: args[0], $top: args[1], $skip: args[2] }) },
            { name: "groupsCount", method: "GET", uri: args => this.formatUri("/api/report/groups", undefined, { $select: "Id", status: args[0] }), responseCallback: r => r.length },
            { name: "getCampaignById", method: "GET", uri: args => this.formatUri("/api/report/" + args[0], undefined, undefined) },
            { name: "getCampaignGroupById", method: "GET", uri: args => this.formatUri("/api/report/group/" + args[0], undefined, undefined) },
            { name: "getCampaignDetailsById", method: "GET", uri: args => this.formatUri("/api/report/" + args[0] + "/details", undefined, undefined) },
            { name: "getCampaignDetailsByGroupId", method: "GET", uri: args => this.formatUri("/api/report/group/" + args[0] + "/details", undefined, undefined) },
            { name: "campaigns", method: "GET", uri: args => this.formatUri("/api/report", undefined, { status: args[0], $top: args[1], $skip: args[2] }) },
            { name: "getCampaignsModeration", method: "GET", uri: "/api/report/moderation" },
            { name: "GetReportPowerBI", method: "GET", uri: args => this.formatUri("/api/report/group/" + args[0] + "/powerbi", undefined, undefined) },
        );
    }
}