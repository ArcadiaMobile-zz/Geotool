interface ReportCampaignById {
    Name: string;
    Id: string;
    Reach: number;
    Type: string;
    AdvertisementType: AdvertisementType;
    Budget: number;
    StartDate: string;
    EndDate: string;
    Product: ReportProductCampaignById;
    ButtonClicks: number;
    ViewClicks: number;
    CTCClicks: number;
    InvoiceLink: string;
    Objective: EvaluationObjective;
    Banners: ReportBannerCampaignById[];
    ProductClicks: ReportProductNumbersCampaignById[];
    ProductViews: ReportProductNumbersCampaignById[];
    ProductUniqueUsers: ReportProductNumbersCampaignById[];
    ProductReachUniqueUsers: ReportProductNumbersCampaignById[];
    Copy: CampaignUserData;
    Location: ReportLocationCampaignByIdBinding[];
    IsBulk: boolean;
    LastReportDownload?: Date;
}

interface ReportLocationCampaignByIdBinding {
    Latitude: number;
    Longitude: number;
    Address: string;
    Name: string;
    Radius: number;
}

interface ReportProductNumbersCampaignById {
    Date: string;
    Value: number;
}

interface ReportBannerCampaignById {
    Url: string;
    Size: BannerSize;
    IsDisplay: boolean;
    IsFacebook: boolean;
    IsSearch: boolean;
    IsSmartphone: boolean;
    IsTablet: boolean;
    IsGeneric: boolean;
    Copy: CampaignUserData;
    Position: number;
}

interface ReportProductCampaignById {
    Name: string;
    Value: number;
    Description: string;
}

interface ReportCampaignByGroupId extends ReportCampaignById {

}

enum BannerSize {
    Format300x250,
    Format320x50,
    Format728x90,
    Format1200x628,
    Format640x1024,
    Format2020x1320,
    Format320x480,
    None
}