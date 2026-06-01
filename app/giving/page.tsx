"use client";

import { useState, useCallback } from "react";
import { Heart, Landmark, CreditCard, CheckCircle, AlertCircle, Copy, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { generatePaymentReference, formatAmountForPaystack, type PaystackCallbackResponse } from "@/lib/paystack";
import PaystackPop from "@paystack/inline-js";

const givingPurposes = [
  { value: "tithe", label: "Tithe" },
  { value: "offering", label: "Offering" },
  { value: "mission", label: "Mission" },
  { value: "building-fund", label: "Building Fund" },
  { value: "other", label: "Other" },
] as const;

type GivingPurpose = (typeof givingPurposes)[number]["value"];

interface FormData {
  name: string;
  email: string;
  amount: string;
  purpose: GivingPurpose | "";
}

interface FormErrors {
  name?: string;
  email?: string;
  amount?: string;
  purpose?: string;
}

export default function GivingPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    amount: "",
    purpose: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.amount.trim()) {
      newErrors.amount = "Amount is required";
    } else {
      const amountNum = parseFloat(formData.amount);
      if (isNaN(amountNum) || amountNum <= 0) {
        newErrors.amount = "Please enter a valid amount";
      } else if (amountNum < 100) {
        newErrors.amount = "Minimum amount is ₦100";
      }
    }

    if (!formData.purpose) {
      newErrors.purpose = "Please select a purpose";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (errors[name as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [errors]
  );

  const handlePaystackPayment = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    setPaymentStatus("idle");
    setErrorMessage("");

    try {
      const reference = generatePaymentReference();
      const amountInKobo = formatAmountForPaystack(parseFloat(formData.amount));

      const response = await fetch("/api/giving/initialize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          amount: amountInKobo,
          reference,
          metadata: {
            custom_fields: [
              {
                display_name: "Donor Name",
                variable_name: "donor_name",
                value: formData.name,
              },
              {
                display_name: "Purpose",
                variable_name: "purpose",
                value: formData.purpose,
              },
            ],
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to initialize payment");
      }

      const { data } = await response.json();

      const paystack = new (PaystackPop as any)();
      paystack.newTransaction({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
        email: formData.email,
        amount: amountInKobo,
        ref: reference,
        metadata: {
          custom_fields: [
            {
              display_name: "Donor Name",
              variable_name: "donor_name",
              value: formData.name,
            },
            {
              display_name: "Purpose",
              variable_name: "purpose",
              value: formData.purpose,
            },
          ],
        },
        onLoad: () => {
          setIsSubmitting(false);
        },
        callback: async (response: PaystackCallbackResponse) => {
          if (response.status === "success") {
            try {
              const verifyResponse = await fetch(
                `/api/giving/verify?reference=${response.reference}`
              );
              if (verifyResponse.ok) {
                setPaymentStatus("success");
                setFormData({ name: "", email: "", amount: "", purpose: "" });
              } else {
                throw new Error("Verification failed");
              }
            } catch {
              setPaymentStatus("error");
              setErrorMessage(
                "Payment was successful but we couldn't verify it. Please contact support."
              );
            }
          } else {
            setPaymentStatus("error");
            setErrorMessage("Payment was not completed. Please try again.");
          }
        },
        onClose: () => {
          setIsSubmitting(false);
        },
      });
    } catch (err) {
      setIsSubmitting(false);
      setPaymentStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "An error occurred. Please try again."
      );
    }
  };

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <section className="relative bg-stone-900 py-24 lg:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-stone-800 to-stone-950" />
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-6 inline-flex items-center justify-center rounded-full bg-white/10 p-3 backdrop-blur-sm">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Give with a{" "}
              <span className="text-stone-300">Grateful Heart</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-stone-300">
              Your generous giving supports our mission to spread the Gospel,
              serve our community, and make a difference in lives around the
              world. Every contribution helps us continue the work God has
              called us to do.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-stone-200">
              <div className="mb-8 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-100">
                  <CreditCard className="h-5 w-5 text-stone-700" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-stone-900">
                    Online Giving
                  </h2>
                  <p className="text-sm text-stone-500">
                    Secure payment powered by Paystack
                  </p>
                </div>
              </div>

              {paymentStatus === "success" && (
                <div className="mb-6 rounded-xl bg-green-50 p-4 ring-1 ring-green-200">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-green-900">
                        Thank you for your giving!
                      </h3>
                      <p className="mt-1 text-sm text-green-700">
                        Your payment has been received successfully. May God
                        bless you abundantly for your generosity.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {paymentStatus === "error" && (
                <div className="mb-6 rounded-xl bg-red-50 p-4 ring-1 ring-red-200">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-red-900">
                        Payment Failed
                      </h3>
                      <p className="mt-1 text-sm text-red-700">
                        {errorMessage ||
                          "Something went wrong. Please try again."}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handlePaystackPayment();
                }}
                className="space-y-6"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-stone-700"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={cn(
                      "mt-1.5 block w-full rounded-lg border-0 px-3 py-2.5 text-stone-900 shadow-sm ring-1 ring-inset placeholder:text-stone-400 focus:ring-2 focus:ring-inset sm:text-sm",
                      errors.name
                        ? "ring-red-300 focus:ring-red-500"
                        : "ring-stone-300 focus:ring-stone-600"
                    )}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-stone-700"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={cn(
                      "mt-1.5 block w-full rounded-lg border-0 px-3 py-2.5 text-stone-900 shadow-sm ring-1 ring-inset placeholder:text-stone-400 focus:ring-2 focus:ring-inset sm:text-sm",
                      errors.email
                        ? "ring-red-300 focus:ring-red-500"
                        : "ring-stone-300 focus:ring-stone-600"
                    )}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="amount"
                    className="block text-sm font-medium text-stone-700"
                  >
                    Amount (NGN) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative mt-1.5">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-stone-500 sm:text-sm">₦</span>
                    </div>
                    <input
                      type="number"
                      id="amount"
                      name="amount"
                      min="100"
                      step="1"
                      value={formData.amount}
                      onChange={handleInputChange}
                      className={cn(
                        "block w-full rounded-lg border-0 py-2.5 pl-7 pr-3 text-stone-900 shadow-sm ring-1 ring-inset placeholder:text-stone-400 focus:ring-2 focus:ring-inset sm:text-sm",
                        errors.amount
                          ? "ring-red-300 focus:ring-red-500"
                          : "ring-stone-300 focus:ring-stone-600"
                      )}
                      placeholder="0.00"
                    />
                  </div>
                  {errors.amount && (
                    <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
                  )}
                  <p className="mt-1 text-xs text-stone-500">
                    Minimum amount: ₦100
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="purpose"
                    className="block text-sm font-medium text-stone-700"
                  >
                    Purpose <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="purpose"
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleInputChange}
                    className={cn(
                      "mt-1.5 block w-full rounded-lg border-0 px-3 py-2.5 text-stone-900 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm",
                      errors.purpose
                        ? "ring-red-300 focus:ring-red-500"
                        : "ring-stone-300 focus:ring-stone-600"
                    )}
                  >
                    <option value="">Select a purpose</option>
                    {givingPurposes.map((purpose) => (
                      <option key={purpose.value} value={purpose.value}>
                        {purpose.label}
                      </option>
                    ))}
                  </select>
                  {errors.purpose && (
                    <p className="mt-1 text-sm text-red-600">{errors.purpose}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-stone-800 hover:bg-stone-700 text-white py-3 h-auto text-base font-medium"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Give Now"
                  )}
                </Button>

                <p className="text-center text-xs text-stone-500">
                  Secured by Paystack. Your payment information is encrypted and
                  secure.
                </p>
              </form>
            </div>

            <div className="space-y-8">
              <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-stone-200">
                <div className="mb-8 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-100">
                    <Landmark className="h-5 w-5 text-stone-700" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-stone-900">
                      Bank Transfer
                    </h2>
                    <p className="text-sm text-stone-500">
                      Alternative payment method
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="rounded-xl bg-stone-50 p-4">
                    <label className="block text-xs font-medium uppercase tracking-wider text-stone-500">
                      Bank Name
                    </label>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-lg font-semibold text-stone-900">
                        First Bank of Nigeria
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          copyToClipboard("First Bank of Nigeria", "bank")
                        }
                        className="rounded-md p-2 text-stone-500 hover:bg-stone-200 hover:text-stone-700 transition-colors"
                        title="Copy bank name"
                      >
                        {copiedField === "bank" ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="rounded-xl bg-stone-50 p-4">
                    <label className="block text-xs font-medium uppercase tracking-wider text-stone-500">
                      Account Number
                    </label>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-2xl font-bold text-stone-900 tracking-wider">
                        1234567890
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          copyToClipboard("1234567890", "account")
                        }
                        className="rounded-md p-2 text-stone-500 hover:bg-stone-200 hover:text-stone-700 transition-colors"
                        title="Copy account number"
                      >
                        {copiedField === "account" ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="rounded-xl bg-stone-50 p-4">
                    <label className="block text-xs font-medium uppercase tracking-wider text-stone-500">
                      Account Name
                    </label>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-lg font-semibold text-stone-900">
                        Chapel of Redemption ABU Samaru
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          copyToClipboard(
                            "Chapel of Redemption ABU Samaru",
                            "accountName"
                          )
                        }
                        className="rounded-md p-2 text-stone-500 hover:bg-stone-200 hover:text-stone-700 transition-colors"
                        title="Copy account name"
                      >
                        {copiedField === "accountName" ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-lg bg-amber-50 p-4 ring-1 ring-amber-200">
                  <p className="text-sm text-amber-800">
                    <strong>Note:</strong> Please include your name and purpose
                    (Tithe/Offering/Mission/etc.) in the transfer narration for
                    proper record keeping.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-stone-800 p-8 text-white">
                <h3 className="text-lg font-semibold">Why We Give</h3>
                <ul className="mt-4 space-y-3 text-stone-300">
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-stone-700 text-xs font-medium">
                      1
                    </span>
                    <span>
                      To support the spreading of the Gospel and missions work
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-stone-700 text-xs font-medium">
                      2
                    </span>
                    <span>To maintain and develop church facilities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-stone-700 text-xs font-medium">
                      3
                    </span>
                    <span>To support community outreach and charity programs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-stone-700 text-xs font-medium">
                      4
                    </span>
                    <span>To obey God's command and receive His blessings</span>
                  </li>
                </ul>
                <p className="mt-6 text-sm italic text-stone-400">
                  "Bring the whole tithe into the storehouse, that there may be
                  food in my house. Test me in this," says the Lord Almighty,
                  "and see if I will not throw open the floodgates of heaven and
                  pour out so much blessing that there will not be room enough
                  to store it." — Malachi 3:10
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
