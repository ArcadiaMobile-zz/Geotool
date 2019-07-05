interface MapItem {
    insights: {
        data: {
            PotentialUsers: string;
            MaleStats: string;
            FemaleStats: string;
            MaleStatsPercentage: number;
            FemaleStatsPercentage: number;
            PublicOfficesNumber: number;
            PrivatesNumber: number;
            PublicTransportNumber: number;
            Competitors: number;
            Ranking: number[];
            Cluster: AreaType;
            DensityPotentialUsers: number;
            DensityPotentialUsersNumber?: number;
        }
    };
    id: string;
    lat: number;
    lng: number;
    address: string;
    radius: number;
    image: string;
    title: string
    phoneNumber?: string | null,
    budget: {
        id: string,
        value: string,
        target?: string,
        reach?: number,
    }
}

enum AreaType {
    Metropolitana,
    Urbana,
    Cittadina,
    Rurale
}

enum BulkFlow {
    Small,
    Medium,
    High
}