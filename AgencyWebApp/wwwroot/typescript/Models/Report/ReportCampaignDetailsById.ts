interface ReportCampaignDetailsById extends ReportCampaignById {
    Devices: ReportCampaignDetailNumbersById[];
    OperatingSystems: ReportCampaignDetailNumbersById[];
    Genders: ReportCampaignDetailNumbersById[];
    Timings: ReportCampaignDetailNumbersById[];
    Sizes: ReportCampaignDetailNumbersById[];
    TopApps: ReportCampaignDetailNumbersById[];
    TopKeywords: ReportCampaignDetailNumbersById[];
}

interface ReportCampaignDetailNumbersById {
    Name: string;
    Value: number;
    ImgClass: any;
}

interface ReportCampaignTopApps {
    Name: string;
    topApp: ReportCampaignDetailNumbersById[]
}

interface ReportCampaignDetailsByGroupId extends ReportCampaignByGroupId {
    Devices: ReportCampaignDetailNumbersById[];
    OperatingSystems: ReportCampaignDetailNumbersById[];
    Genders: ReportCampaignDetailNumbersById[];
    Timings: ReportCampaignDetailNumbersById[];
    Sizes: ReportCampaignDetailNumbersById[];
    TopApps: ReportCampaignDetailNumbersById[];
    TopKeywords: ReportCampaignDetailNumbersById[];
}