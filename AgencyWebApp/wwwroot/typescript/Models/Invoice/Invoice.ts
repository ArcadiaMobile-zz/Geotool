interface Invoice extends BaseVersion {
    InvoiceId: string;
    InvoiceNumber: string;
    InvoiceDate: Date;
    CustomerId: string;
    CampaignId: string;
    InvoiceTargetDescription: string;
    InvoiceTargetAddress: string;
    InvoiceTargetCity: string;
    InvoiceTargetState: string;
    InvoiceTargetPostalCode: string;
    CountryId: number;
    InvoiceTargetVATCode: string;
    InvoiceAmount: number;
    PaymentMethodId: string;
    PaymentId: string;
    VATPercentageId: string;
    InvoiceEmail: string;
    PhoneNumber: string;
    CompanyName: string;
}