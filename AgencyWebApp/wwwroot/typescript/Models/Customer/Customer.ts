interface Customer extends BaseVersion {
    CustomerId: string;
    CustomerDescription: string;
    CustomerBirthDate: Date;
    CustomerBirthCountryId: number;
    CustomerBirthState: string;
    CustomerBirthCity: string;
    CustomerAddressCountryId: number;
    CustomerAddressState: string;
    CustomerAddressCity: string;
    CustomerAddressPostalCode: string;
    CustomerAddressLine: string;
    CustomerEmail: string;
}