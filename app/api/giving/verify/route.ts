import { NextRequest, NextResponse } from "next/server";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_BASE_URL = "https://api.paystack.co";

export async function GET(request: NextRequest) {
  try {
    if (!PAYSTACK_SECRET_KEY) {
      return NextResponse.json(
        { status: false, message: "Payment service not configured" },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const reference = searchParams.get("reference");

    if (!reference) {
      return NextResponse.json(
        { status: false, message: "Reference is required" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${PAYSTACK_BASE_URL}/transaction/verify/${encodeURIComponent(reference)}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok || !data.status) {
      return NextResponse.json(
        {
          status: false,
          message: data.message || "Failed to verify transaction",
        },
        { status: response.status }
      );
    }

    const transaction = data.data;

    if (transaction.status === "success") {
      // Here you would typically save the transaction to your database
      // For now, we just return the success response
      console.log("Payment verified successfully:", {
        reference: transaction.reference,
        amount: transaction.amount,
        email: transaction.customer.email,
        channel: transaction.channel,
        paid_at: transaction.paid_at,
      });
    }

    return NextResponse.json({
      status: true,
      message: "Transaction verified successfully",
      data: transaction,
    });
  } catch (error) {
    console.error("Paystack verification error:", error);
    return NextResponse.json(
      {
        status: false,
        message: "An unexpected error occurred. Please try again.",
      },
      { status: 500 }
    );
  }
}
