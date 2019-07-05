interface CampaignDashboard extends BaseVersion {
    CampaignId: string;
    PurchaseDateTime: Date;
    BusinessName: string;
    BusinessAddress: string;
    Objective: string;
    BusinessCategoryDescription: string;
    ProductDescription: string;
    ProductPrice: number;
    CampaignStartDate: Date;
    LandingUri: string;
    BannerUri: string;
    AccountEmail: string;
    PaymentType: string;
    InvoiceData: string;
}