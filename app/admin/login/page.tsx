"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Loader2, Cross } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const { data: { user }, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError("Invalid email or password");
        setIsLoading(false);
        return;
      }

      if (!user) {
        setError("Authentication failed");
        setIsLoading(false);
        return;
      }

      const { data: admin, error: adminError } = await supabase
        .from("admins")
        .select("id")
        .eq("user_id", user.id)
        .single();

      if (adminError || !admin) {
        await supabase.auth.signOut();
        setError("You do not have admin access");
        setIsLoading(false);
        return;
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      setError("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-stone-100 mb-4">
              <Cross className="h-8 w-8 text-stone-800" />
            </div>
            <h1 className="text-2xl font-bold text-stone-900">
              Admin Login
            </h1>
            <p className="text-stone-600 mt-2">
              Chapel of Redemption
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
                className={cn(
                  "h-12",
                  error && "border-red-300 focus-visible:ring-red-500"
                )}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className={cn(
                  "h-12",
                  error && "border-red-300 focus-visible:ring-red-500"
                )}
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-stone-800 hover:bg-stone-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-stone-500">
            <a href="/" className="text-stone-800 hover:underline">
              ← Back to website
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
