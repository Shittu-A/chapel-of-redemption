"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  FileText,
  Users,
  Calendar,
  Newspaper,
  Settings,
  LogOut,
  Menu,
  X,
  Cross,
  Shield,
} from "lucide-react";
import { useState } from "react";

interface AdminSidebarProps {
  userRole: string;
}

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/content", label: "Content", icon: FileText },
  { href: "/admin/teams", label: "Teams", icon: Users },
  { href: "/admin/activities", label: "Activities", icon: Calendar },
  { href: "/admin/newsletter", label: "Newsletter", icon: Newspaper },
];

const superAdminItems = [
  { href: "/admin/users", label: "Users", icon: Shield },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar({ userRole }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isSuperAdmin = userRole === "super_admin";

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  const allNavItems = isSuperAdmin
    ? [...navItems, ...superAdminItems]
    : navItems;

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-stone-900 border-b border-stone-800 px-4 py-3 flex items-center justify-between">
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-stone-800 flex items-center justify-center">
            <Cross className="h-4 w-4 text-white" />
          </div>
          <span className="font-semibold text-white">Admin</span>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-white hover:bg-stone-800"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-stone-900 pt-16">
          <nav className="p-4 space-y-1">
            {allNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-stone-800 text-white"
                      : "text-stone-400 hover:text-white hover:bg-stone-800/50"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-stone-400 hover:text-white hover:bg-stone-800/50 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </nav>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:flex lg:w-64 lg:flex-col bg-stone-900">
        <div className="flex h-16 items-center gap-2 px-6 border-b border-stone-800">
          <div className="h-8 w-8 rounded-full bg-stone-800 flex items-center justify-center">
            <Cross className="h-4 w-4 text-white" />
          </div>
          <span className="font-semibold text-white">Admin Panel</span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {allNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-stone-800 text-white"
                    : "text-stone-400 hover:text-white hover:bg-stone-800/50"
                )}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-stone-800 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-stone-400 hover:text-white hover:bg-stone-800/50 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Spacer for mobile */}
      <div className="h-14 lg:hidden" />
    </>
  );
}
