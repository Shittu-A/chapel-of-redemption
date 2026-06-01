import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminSidebar from "@/components/admin/sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: admin } = await supabase
    .from("admins")
    .select("role")
    .eq("user_id", user.id)
    .single();

  if (!admin) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <AdminSidebar userRole={admin.role} />
      <main className="lg:ml-64 min-h-screen">
        <div className="p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
