interface BaseRadiusInsigntResult
{
    Insights: RadiusInsight[];
}
interface RadiusInsight
{
    Radius: number;
    PotentialUsers: number;
    MaleStats: number;
    MaleStatsPercentage: number;
    MaleStatsAverageAge: number;
    FemaleStats: number;
    FemaleStatsPercentage: number;
    FemaleStatsAverageAge: number;
}
