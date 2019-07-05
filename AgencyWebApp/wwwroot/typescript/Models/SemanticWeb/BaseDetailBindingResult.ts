interface BaseDetailBindingResult extends BaseLocationBindingResult {
    Url: string;
    Website: string;
    PhoneNumber: string;
    PotentialUsers: number;
    MaleStats: number;
    MaleStatsPercentage: number;
    MaleStatsAverageAge: number;
    FemaleStats: number;
    FemaleStatsPercentage: number;
    FemaleStatsAverageAge: number;
    BugdetMinValue: number;
    BugdetMaxValue: number;
    PublicOfficesNumber: number;
    PrivatesNumber: number;
    PublicTransportNumber: number;
    Radius: number;
    Tracing: string;
    Population: number;
    Cluster: AreaType;
}