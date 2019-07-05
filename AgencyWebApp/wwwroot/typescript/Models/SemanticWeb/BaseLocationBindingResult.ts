interface BaseLocationBindingResult {
    Address: string;
    Geometry: Geometry;
    ID: string;
    Name: string;
    Categories: CategoryCompetitor[];
}

interface LocationCoordinates {
    lat: number;
    lng: number;
}

interface Geometry {
    location: LocationCoordinates;
}

interface BaseLocationBindingResults {
    Results: BaseLocationBindingResult[];
    Status: string;
    Json: string;
    ContainsBadwords: boolean;
}