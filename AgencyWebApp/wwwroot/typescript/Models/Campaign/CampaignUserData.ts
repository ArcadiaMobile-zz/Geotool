interface CampaignUserData {

}

interface SearchCampaignUserData extends CampaignUserData {
    Headline: string;
    Row1: string;
    DisplayUrl: string;
    Row2: string;
}

interface FacebookCampaignUserData extends CampaignUserData {
    Title: string;
    Description: string;
}

interface DisplayCampaignUserData extends CampaignUserData {

}