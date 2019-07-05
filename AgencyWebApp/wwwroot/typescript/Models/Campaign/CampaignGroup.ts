/// <reference path="Campaign.ts" />
/// <reference path="../Invoice/Invoice.ts" />
interface CampaignGroup {
    CampaignGroupId: string;
    Invoices: Invoice[];
    TargetMarket: string;
    Campaigns: CampaignBinding[];
}