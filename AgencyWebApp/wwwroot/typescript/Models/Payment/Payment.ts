interface Payment extends BaseVersion {
    PaymentId: string;
    PaymentAmount: number;
    PaymentReceived?: Date;
}