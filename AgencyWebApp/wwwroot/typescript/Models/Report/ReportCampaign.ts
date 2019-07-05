interface ReportCampaignBinding {
    CampaignName: string;
    Type: string;
    Id: string;
    CampaignGroupId: string;
    StartDate: Date;
    EndDate: Date;
}

enum CampaignStatusEnum {
    All,
    Active,
    Scheduled,
    End,
    ToApprove,
    Waiting,
    Rejected
}