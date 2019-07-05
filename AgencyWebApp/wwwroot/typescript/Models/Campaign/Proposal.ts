interface Proposal {
    Proposals: ProposalItem[];
    Tracing: string;
    MobileUserRadius: number;
    CompetitorsNumber: number;
    Ranking: number[];
}

interface ProposalItem {
    ProposalInfo: ProposalItemInfo;
    Id: string;
    EstimatedDuration: string;
    Tracing: string;
    ProposalType: string;
    AdvertisementType: AdvertisementType;
    CampaignProviderId: string;
    Products: ProposalProductItem[];
}

enum AdvertisementType {
    DISPLAYCLICK,
    DISPLAYUU,
    SOCIALFB,
    SMS,
    SEARCHGOOGLE,
    FLYER
}

interface ProposalItemInfo {
    CreatedOn: Date;
    Name: string;
    Description: string;
    Efficacy: number;
    MinBudget: number;
    MaxBudget: number;
}

enum GenderType {
    BOTH,
    MALE,
    FEMALE
}

interface ProposalProductItem {
    Id: string;
    Price: number;
    VAT: number;
    EstimatedDuration: string;
    Value: number;
    Description: string;
    GenderTargets: GenderType;
    CopyItems: ProposalCopyItem[];
    Impressions: number;
}

interface ProposalCopyItem {
    Id: string;
    BannerIds: string[];
    SuggestedDescription: string;
    SuggestedTitle: string;
}

interface DisplayProposalCopyItem extends ProposalCopyItem {
    SuggestedTitle: string;
    SuggestedDescription: string;
}

interface SearchProposalCopyItem extends ProposalCopyItem {
    SuggestedKeywords: string[];
    SuggestedHeadline: string;
    SuggestedRow1: string;
    SuggestedRow2: string;
}

interface FacebookProposalCopyItem extends ProposalCopyItem {
    SuggestedTitle: string;
    SuggestedDescription: string;
}