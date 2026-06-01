"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Save, CheckCircle, Settings, Church, CreditCard, Mail } from "lucide-react";

interface SiteSettings {
  church_name: string;
  church_address: string;
  church_phone: string;
  church_email: string;
  paystack_public_key: string;
  bank_name: string;
  account_number: string;
  account_name: string;
}

const defaultSettings: SiteSettings = {
  church_name: "Chapel of Redemption ABU Samaru",
  church_address: "Ahmadu Bello University, Samaru, Zaria, Kaduna State, Nigeria",
  church_phone: "+234 XXX XXX XXXX",
  church_email: "info@chapelofredemption.org",
  paystack_public_key: "",
  bank_name: "First Bank of Nigeria",
  account_number: "1234567890",
  account_name: "Chapel of Redemption ABU Samaru",
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");
  const supabase = createClient();

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setIsLoading(true);
    
    // In a real implementation, these would come from a settings table
    // For now, we'll use environment variables or local state
    const storedSettings = localStorage.getItem("site_settings");
    if (storedSettings) {
      setSettings({ ...defaultSettings, ...JSON.parse(storedSettings) });
    }
    
    setIsLoading(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus("idle");

    try {
      // In production, save to Supabase or your backend
      localStorage.setItem("site_settings", JSON.stringify(settings));
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch {
      setSaveStatus("error");
    } finally {
      setIsSaving(false);
    }
  };

  const updateSetting = (key: keyof SiteSettings, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-stone-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-stone-900">Settings</h1>
        <p className="text-stone-600 mt-1">Configure church information and payment settings.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Church className="h-5 w-5" />
              Church Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="church_name">Church Name</Label>
              <Input
                id="church_name"
                value={settings.church_name}
                onChange={(e) => updateSetting("church_name", e.target.value)}
                placeholder="Church Name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="church_address">Address</Label>
              <textarea
                id="church_address"
                value={settings.church_address}
                onChange={(e) => updateSetting("church_address", e.target.value)}
                placeholder="Full address"
                className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="church_phone">Phone</Label>
              <Input
                id="church_phone"
                value={settings.church_phone}
                onChange={(e) => updateSetting("church_phone", e.target.value)}
                placeholder="Phone number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="church_email">Email</Label>
              <Input
                id="church_email"
                type="email"
                value={settings.church_email}
                onChange={(e) => updateSetting("church_email", e.target.value)}
                placeholder="Email address"
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="paystack_key">Paystack Public Key</Label>
                <Input
                  id="paystack_key"
                  value={settings.paystack_public_key}
                  onChange={(e) => updateSetting("paystack_public_key", e.target.value)}
                  placeholder="pk_test_... or pk_live_..."
                  type="password"
                />
                <p className="text-xs text-stone-500">
                  Get this from your Paystack dashboard
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Bank Transfer Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bank_name">Bank Name</Label>
                <Input
                  id="bank_name"
                  value={settings.bank_name}
                  onChange={(e) => updateSetting("bank_name", e.target.value)}
                  placeholder="Bank name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="account_number">Account Number</Label>
                <Input
                  id="account_number"
                  value={settings.account_number}
                  onChange={(e) => updateSetting("account_number", e.target.value)}
                  placeholder="Account number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="account_name">Account Name</Label>
                <Input
                  id="account_name"
                  value={settings.account_name}
                  onChange={(e) => updateSetting("account_name", e.target.value)}
                  placeholder="Account name"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-stone-800 hover:bg-stone-700"
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Settings
            </>
          )}
        </Button>

        {saveStatus === "success" && (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle className="h-5 w-5" />
            <span className="text-sm font-medium">Settings saved!</span>
          </div>
        )}

        {saveStatus === "error" && (
          <div className="flex items-center gap-2 text-red-600">
            <span className="text-sm font-medium">Failed to save. Please try again.</span>
          </div>
        )}
      </div>
    </div>
  );
}
