interface CityPopulationResult {
    IstatCode: string;
    RegionCode: string;
    ProvinceCode: string;
    City: string;
    Region: string;
    Province: string;
    ShortProvince: string;
    Points: number;
    Population: number;
}

interface CityPopulationResults {
    Results: CityPopulationResult[];
}