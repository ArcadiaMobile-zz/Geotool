interface Evaluation {
    BusinessName: string;
    BusinessCategoryId: string | undefined;
    FreeText: string;
    StartDate: Date;
    Budget: number;
    Locations: EvaluationLocation[];
    Proposal: EvaluationObjective;
    Website: string;
    FacebookPage: string;
    Top: number;
}

enum EvaluationObjective {
    PromotionPrice,
    PromotionDiscount,
    NewOffer,
    Branding,
    AnotherTarget,
}

interface EvaluationLocation {
    Latitude: number;
    Longitude: number;
}