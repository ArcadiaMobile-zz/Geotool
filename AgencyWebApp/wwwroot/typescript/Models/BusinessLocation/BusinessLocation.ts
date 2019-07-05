interface BusinessLocation extends BaseVersion {
    BusinessLocationId: string;
    BusinessId: string;
    BusinessLocationDescription: string;
    BusinessLocationAddress: string;
    BusinessLocationCity: string;
    BusinessLocationState: string;
    BusinessLocationPostalCode: string;
    CountryId: number;
    BusinessLocationGPSCoordinatesLongitude: number;
    BusinessLocationGPSCoordinatesLatitude: number;
}