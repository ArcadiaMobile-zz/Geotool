interface ReportCampaignsSummary {
    Active: number;
    Scheduled: number;
    End: number;
}

interface ReportCampaignGroupsSummaryBinding extends ReportCampaignsSummary {
    ToApprove: number;
    Waiting: number;
    Rejected: number;
}