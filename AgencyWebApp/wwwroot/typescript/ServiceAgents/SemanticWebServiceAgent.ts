interface SemanticWebServiceAgent {
    searchLocation(locationAddress: string, activityName: string): Promise<BaseLocationBindingResults>;
    search(searchText: string): Promise<BaseSearchBindingResults>;
    getDetails(id: string, shopName: string, location?: { latitude: number, longitude: number }): Promise<BaseDetailBindingResult>;
    getBulkDetails(shopName: string, proposalBulkId: string): Promise<BaseDetailBindingResult[]>;
    GeocodeAddress(address: string): Promise<AddressComponentBinding>;
    Geocode(proposalBulkId: string, placeId: string, address: string): Promise<AddressComponentBinding>;
    GeocodeLocationFile(data: FormData): Promise<BulkImportBindingResults>;
}

class SemanticWebServiceAgent extends AutoServiceAgent<SemanticWebServiceAgent> {
    constructor(context: ServiceAgentContext) {
        super(context,
            { name: "searchLocation", uri: args => this.formatUri("/api/SemanticWeb/SearchLocation", args) },
            { name: "search", uri: args => this.formatUri("/api/SemanticWeb/Search", args) },
            { name: "getDetails", uri: args => this.formatUri("/api/SemanticWeb/GetDetails", [args[0], args[1]], { latitude: args[2].latitude, longitude: args[2].longitude, isBulkUpload: args[3], proposalBulkId: args[4] }) },
            { name: "getBulkDetails", uri: args => this.formatUri("/api/SemanticWeb/GetBulkDetails", [args[0], args[1]]) },
            { name: "GeocodeAddress", uri: args => this.formatUri("/api/SemanticWeb/GeocodeAddress", args) },
            { name: "Geocode", uri: args => this.formatUri("/api/SemanticWeb/Geocode", [args[0], args[1], args[2]]) },
            { name: "GeocodeLocationFile", method: "POST", uri: "/api/SemanticWeb/Geocode/File", body: args => args[0] }
        );

        if (dev.fakeSemanticWeb) {
            this.getDetails = () => Promise.resolve(JSON.parse('{"Url":"https://maps.google.com/?cid=9154458214224756504","Website":"http://illorenzaccio.wordpress.com/","PhoneNumber":"030 220457","PotentialUsers":50547,"MaleStats":26819.957859411254,"MaleStatsPercentage":0.53,"MaleStatsAverageAge":29.0,"FemaleStats":23727.466440728695,"FemaleStatsPercentage":0.47,"FemaleStatsAverageAge":39.0,"BugdetMinValue":10,"BugdetMaxValue":60,"PublicOfficesNumber":43,"PrivatesNumber":13,"PublicTransportNumber":14,"Radius":3000,"Tracing":null,"Population":610,"Address":"Via Cipro, 78, 25124 Brescia BS","Geometry":{"location":{"lat":45.523879499999993,"lng":10.2103229}},"ID":"ChIJxXJsdHZ2gUcRGP8FUj4rC38","Name":"Il Lorenzaccio","Categories":[{"Category":"RS0100","Description":"Ristorante","Score":100.0,"Competitors":20},{"Category":"RS0101","Description":"Ristorante di carne","Score":0.0,"Competitors":20},{"Category":"RS0102","Description":"Ristorante di pesce","Score":0.0,"Competitors":17},{"Category":"RS0103","Description":"Trattoria","Score":0.0,"Competitors":20}]}'));
        }
        if (dev.fakeGeocodeAddress) {
            this.GeocodeAddress = () => Promise.resolve(JSON.parse('{ "PlaceId": "ChIJV6OfdBXBhkcRvXTuKvwoTZo", "StreetNumber": "41", "Address": "Corso Sempione", "City": "Milano","Province": "MI", "Region": "Lombardia","Country": "Italy", "PostalCode": "20145", "Location":{"lat": 45.4811075,"lng": 9.1644886}, "FormattedAddress": "Corso Sempione, 41, 20145 Milano MI, Italy"}'));
        }
    }
}