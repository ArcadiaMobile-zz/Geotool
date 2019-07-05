interface MoreProductsBulkRequest {
    ProposalItemId: string;
    ProposalBulkId: string;
    Name: string;
    Budget: number;
    GenderTargets: GenderType;
    Flow: BulkFlow;
    StartDate: Date;
    EndDate: Date;
    OrderBy: string;
}