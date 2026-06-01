declare module '@paystack/inline-js' {
  interface PaystackPopOptions {
    key: string;
    email: string;
    amount: number;
    ref?: string;
    currency?: string;
    metadata?: Record<string, unknown>;
    onSuccess?: (response: { reference: string; [key: string]: unknown }) => void;
    onCancel?: () => void;
    [key: string]: unknown;
  }

  class PaystackPop {
    static newTransaction(options: PaystackPopOptions): void;
  }

  export default PaystackPop;
}
