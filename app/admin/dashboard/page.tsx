import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, Calendar, Newspaper, TrendingUp } from "lucide-react";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  // Fetch counts from database
  const { count: contentCount } = await supabase
    .from("page_content")
    .select("*", { count: "exact", head: true });

  const { count: teamsCount } = await supabase
    .from("teams")
    .select("*", { count: "exact", head: true });

  const { count: activitiesCount } = await supabase
    .from("activities")
    .select("*", { count: "exact", head: true });

  const { count: newsletterCount } = await supabase
    .from("newsletters")
    .select("*", { count: "exact", head: true });

  const stats = [
    {
      title: "Content Pages",
      value: contentCount || 0,
      icon: FileText,
      href: "/admin/content",
    },
    {
      title: "Teams",
      value: teamsCount || 0,
      icon: Users,
      href: "/admin/teams",
    },
    {
      title: "Activities",
      value: activitiesCount || 0,
      icon: Calendar,
      href: "/admin/activities",
    },
    {
      title: "Newsletters",
      value: newsletterCount || 0,
      icon: Newspaper,
      href: "/admin/newsletter",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-stone-900">Dashboard</h1>
        <p className="text-stone-600 mt-1">
          Welcome to the Chapel of Redemption admin panel.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-stone-600">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-stone-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-stone-900">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <a
              href="/admin/content"
              className="block p-3 rounded-lg bg-stone-50 hover:bg-stone-100 transition-colors"
            >
              <div className="font-medium text-stone-900">Edit Content</div>
              <div className="text-sm text-stone-600">Update page content and sections</div>
            </a>
            <a
              href="/admin/teams"
              className="block p-3 rounded-lg bg-stone-50 hover:bg-stone-100 transition-colors"
            >
              <div className="font-medium text-stone-900">Manage Teams</div>
              <div className="text-sm text-stone-600">Add or edit team members</div>
            </a>
            <a
              href="/admin/activities"
              className="block p-3 rounded-lg bg-stone-50 hover:bg-stone-100 transition-colors"
            >
              <div className="font-medium text-stone-900">Add Activity</div>
              <div className="text-sm text-stone-600">Post new activities and events</div>
            </a>
            <a
              href="/admin/newsletter"
              className="block p-3 rounded-lg bg-stone-50 hover:bg-stone-100 transition-colors"
            >
              <div className="font-medium text-stone-900">Publish Newsletter</div>
              <div className="text-sm text-stone-600">Create and publish newsletter issues</div>
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-stone-500 text-sm">
              Activity tracking will be implemented here. This will show recent edits,
              new content, and user actions.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
