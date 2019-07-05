interface AgencyBinding {
    AgencyId: string;
    AgencyDescription: string;
    AgencyReferralFirstName: string;
    AgencyReferralLastName: string;
    AgencyReferralEmail: string;
    AgencyReferralPhoneNumber: string;
    AgencyAddress: string;
    AgencyCity: string;
    AgencyState: string;
    AgencyPostalCode: string;
    CountryId?: number;
    PaymentMethodId: string;
    AgencyVATCode: string;
    AgencyPayMode: string;
    IsAdmin: boolean;
    IsMarketer: boolean;
    IsAgencySales: boolean;
    AgencyPaymentDetails: string;
}

interface AskCreditBinding {
    EuroAmount: number;
}