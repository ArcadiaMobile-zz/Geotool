interface ReportPowerBI {
    DatasetId: string;
    EmbedUrl: string;
    Id: string;
    Name: string;
    WebUrl: string;
    Token: EmbedToken;
}

interface EmbedToken {
    Token: string;
    TokenId: string;
    Expiration: string;
}