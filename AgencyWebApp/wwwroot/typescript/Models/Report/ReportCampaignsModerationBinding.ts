interface ReportCampaignsModerationBinding {
    CustomName: string;
    GroupId: string;
    TotalAmount: number | undefined;
    Type: string;
    ProviderClassName: string;
    TypeClassName: string;
    TotalReach: number;
    Description: string;
    Campaigns: ReportDetailsModerationBinding[];
}

interface ReportDetailsModerationBinding {
    CampaignId: string;
    Name: string;
    Address: string;
    StartDate: Date;
    CreatedDate: Date,
    Amount: number | undefined;
    Type: string;
    Status: string;
    CustomName: string;
    TypeClassName: string;
    Reach: number;
    Description: string;
}