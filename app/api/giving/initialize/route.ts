import { NextRequest, NextResponse } from "next/server";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_BASE_URL = "https://api.paystack.co";

interface InitializeRequestBody {
  email: string;
  amount: number;
  reference?: string;
  metadata?: Record<string, unknown>;
}

export async function POST(request: NextRequest) {
  try {
    if (!PAYSTACK_SECRET_KEY) {
      return NextResponse.json(
        { status: false, message: "Payment service not configured" },
        { status: 500 }
      );
    }

    let body: InitializeRequestBody;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { status: false, message: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    const { email, amount, reference, metadata } = body;

    const errors: Record<string, string> = {};

    if (!email || typeof email !== "string") {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Valid email is required";
    }

    if (typeof amount !== "number" || amount <= 0) {
      errors.amount = "Valid amount is required";
    } else if (amount < 10000) {
      errors.amount = "Minimum amount is ₦100";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          status: false,
          message: "Validation failed",
          errors,
        },
        { status: 400 }
      );
    }

    const paymentData = {
      email: email.trim(),
      amount,
      reference: reference || `COR_${Date.now()}_${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      metadata,
      callback_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/giving`,
    };

    const response = await fetch(`${PAYSTACK_BASE_URL}/transaction/initialize`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    });

    const data = await response.json();

    if (!response.ok || !data.status) {
      return NextResponse.json(
        {
          status: false,
          message: data.message || "Failed to initialize payment",
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      status: true,
      message: "Payment initialized successfully",
      data: data.data,
    });
  } catch (error) {
    console.error("Paystack initialization error:", error);
    return NextResponse.json(
      {
        status: false,
        message: "An unexpected error occurred. Please try again.",
      },
      { status: 500 }
    );
  }
}
