interface SaveCampaignDraftRequestBase {
    CampaignId?: string;
    ProposalItemId?: string;
    ProposalCopyItemId?: string;
    ProposalProductItemId?: string;
    BannerCode?: string;
    Headline: string;
    ProductDescription?: string;
    Discount?: string;
    SearchText: string;
    BusinessName: string;
    Address: string;
    MobilePhone?: string | null;
    BusinessCategoryId: string | undefined;
    StartDate: Date;
    Budget: number;
    Locations: EvaluationLocation[];
    Objective: EvaluationObjective;
    Website: string;
    FacebookPage: string;
    Row1: string;
    DisplayUrl: string;
    Row2: string;
    CampaignCustomName: string;
    Title: string;
    Description: string;
    CustomKeywords: string[];
    ButtonLink?: string | null;
    CtcLink?: string | null;
    CustomBanners: string[] | undefined;
    TailoredBanners: string[] | undefined;
    AddressComponent?: AddressComponentBinding;
    BulkLandingUrl?: string;
    BulkTrackingPixel?: string;
    IsBulk?: boolean;
    Cluster?: AreaType;
    Radius?: number;
    BulkFlow?: BulkFlow;
    ProposalBulkId?: string;
}

interface SaveCampaignGroupDraftRequest {
    CampaignGroupId?: string;
    Campaigns: SaveCampaignDraftRequestBase[];
    CouponCode?: string;
}

interface SaveCampaignDraftRequest extends SaveCampaignDraftRequestBase {
    CouponCode: string;

}

interface BulkCampaignRequest {
    Campaigns: SaveCampaignDraftRequestBase[];
    CouponCode?: string;
}