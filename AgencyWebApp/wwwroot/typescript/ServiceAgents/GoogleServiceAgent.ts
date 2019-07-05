declare namespace google.maps {
    export class Geocoder {
        geocode(request: GeocoderRequest, callback: (results: GeocoderResult[], status: GeocoderStatus) => void): void;
    }

    export class LatLng {
        lat(): number;
        lng(): number;
    }

    export interface GeocoderRequest {
        address?: string;
        location?: { lat: number, lng: number };
        placeId?: string;
        region?: string;
    }

    export enum GeocoderStatus {
        ERROR,
        INVALID_REQUEST,
        OK,
        OVER_QUERY_LIMIT,
        REQUEST_DENIED,
        UNKNOWN_ERROR,
        ZERO_RESULTS
    }

    export interface GeocoderGeometry {
        location: LatLng;
    }

    export interface GeocoderResult {
        formatted_address: string;
        partial_match: boolean;
        postcode_localities: string[];
        geometry: GeocoderGeometry;
        types: string[];
    }
}


class GoogleServiceAgent {

    public geocode(location: LocationCoordinates | string): Promise<google.maps.GeocoderResult> {
        return new Promise((resolver, reject) => {
            let geocoder = new google.maps.Geocoder();
            let request: google.maps.GeocoderRequest = (typeof location === "string") ? { address: location } : { location: location };
            geocoder.geocode(request, (r, s) => {
                if (r.length > 0) {
                    resolver(r[0]);
                } else {
                    reject(s);
                }
            });
        });
    }

}