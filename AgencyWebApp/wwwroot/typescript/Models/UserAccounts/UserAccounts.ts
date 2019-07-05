interface UserAccountsBinding extends BaseVersion {
    AccountEmail: string;
    AccountMobilePhone: string;
    AccountEnabled: boolean;
    AccountLocked: boolean;
    AccountDeleted: boolean;
    AccountCreatedDate: Date;
}