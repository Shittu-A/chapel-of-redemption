/**
 * Paystack utility functions for payment processing
 */

export interface PaystackCallbackResponse {
  reference: string;
  status: "success" | "failed" | "abandoned";
  trans: string;
  transaction: string;
  message: string;
  response?: string;
}

export interface PaystackTransactionData {
  reference: string;
  amount: number;
  status: string;
  customer: {
    email: string;
  };
  channel: string;
  paid_at: string;
  metadata?: {
    custom_fields?: Array<{
      display_name: string;
      variable_name: string;
      value: string;
    }>;
  };
}

/**
 * Generate a unique payment reference
 */
export function generatePaymentReference(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `COR_${timestamp}_${random}`;
}

/**
 * Convert amount from Naira to Kobo (Paystack uses kobo)
 */
export function formatAmountForPaystack(amountInNaira: number): number {
  return Math.round(amountInNaira * 100);
}

/**
 * Convert amount from Kobo to Naira for display
 */
export function formatAmountFromPaystack(amountInKobo: number): number {
  return amountInKobo / 100;
}

/**
 * Format amount for display with Naira symbol
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(amount);
}

/**
 * Validate Paystack public key format
 */
export function isValidPaystackKey(key: string): boolean {
  return key.startsWith("pk_") && key.length > 10;
}

/**
 * Extract error message from Paystack API response
 */
export function getPaystackErrorMessage(error: any): string {
  if (typeof error === "string") return error;
  if (error?.message) return error.message;
  if (error?.response?.data?.message) return error.response.data.message;
  return "An unexpected error occurred. Please try again.";
}
