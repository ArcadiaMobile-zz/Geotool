interface BulkImportBindingResult {
    Row: number;
    Label: string;
    AddressPDV?: AddressComponentBinding;
    AddressCDE?: AddressComponentBinding;
    LandingUrl: string;
    TrackingPixel: string;
    Level: number;
    Status: boolean;
    GoogleId: string;
    CustomError: string;
}

interface BulkImportBindingResults {
    ProposalBulkId: string;
    Results: BulkImportBindingResult[];
    Status: boolean;
}