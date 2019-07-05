interface CampaignBinding extends BaseVersion
{
    CampaignId: string;
    CampaignGroupId: string;
    CampaignTypeId: string;
    CampaignProviderId: string;
    CampaignStartDate: Date;
    CampaignEndDate: Date;
    CampaignBudget: number;
    CampaignStatusId: string;
    CampaignCustomName: string;
}