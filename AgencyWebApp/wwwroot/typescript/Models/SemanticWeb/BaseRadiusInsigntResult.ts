interface BaseRadiusInsigntResult
{
    Insights: RadiusInsight[];
}
interface RadiusInsight
{
    Radius: number;
    PotentialUsers: number;
    MaleStats: number;
    FemaleStats: number;
}
