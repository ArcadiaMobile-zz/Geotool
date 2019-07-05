interface ValidatedCoupon {
    IsValid: boolean;
    Description: string;
    DiscountValue: number;
    DiscountPercentage: number;
    OriginalPrice: number;
    OriginalPriceVAT: number;
    CalculatedPrice: number;
    CalculatedPriceVAT: number;
}