interface BaseGeocodeLocationBindingResult {
    Type: string[];
    FormattedAddress: string;
    AddressComponents: AddressComponent[];
    Geometry: GeocodeGeometry;
    PlaceId: string;
}

interface GeocodeGeometry {
    Location: LocationCoordinates;
    LocationType: string;
    Viewport: Viewport;
    Bounds: Viewport;
}

interface Viewport {
    Southwest: LocationCoordinates;
    Northeast: LocationCoordinates;
}

interface AddressComponent {
    LongName: string;
    ShortName: string;
    Type: string[];
}

interface BaseGeocodeLocationBindingResults {
    Results: BaseGeocodeLocationBindingResult[];
    Status: GeocodeStatus;
    ContainsBadwords: boolean;
}

enum GeocodeStatus {
    OK,
    ZERO_RESULTS,
    OVER_QUERY_LIMIT,
    REQUEST_DENIED,
    INVALID_REQUEST,
    UNKNOW_ERROR
}

interface AddressComponentBinding {
    PlaceId: string;
    StreetNumber: string;
    Address: string;
    City: string;
    Province: string;
    Region: string;
    Country: string;
    PostalCode: string;
    Location: LocationCoordinates;
    FormattedAddress: string;
}