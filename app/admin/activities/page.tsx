"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Loader2, Plus, Pencil, Trash2, Calendar, Play } from "lucide-react";

interface Activity {
  id: string;
  title: string;
  activity_date: string;
  category: "worship" | "outreach" | "event" | "programme" | "other";
  youtube_url: string;
  created_at: string;
}

const categories = [
  { value: "worship", label: "Worship" },
  { value: "outreach", label: "Outreach" },
  { value: "event", label: "Event" },
  { value: "programme", label: "Programme" },
  { value: "other", label: "Other" },
] as const;

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const supabase = createClient();

  const [form, setForm] = useState({
    title: "",
    activity_date: "",
    category: "worship" as Activity["category"],
    youtube_url: "",
  });

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    setIsLoading(true);
    const { data } = await supabase
      .from("activities")
      .select("*")
      .order("activity_date", { ascending: false });
    
    if (data) {
      setActivities(data);
    }
    setIsLoading(false);
  };

  const handleSave = async () => {
    const payload = {
      title: form.title,
      activity_date: form.activity_date,
      category: form.category,
      youtube_url: form.youtube_url,
    };

    if (selectedActivity) {
      await supabase.from("activities").update(payload).eq("id", selectedActivity.id);
    } else {
      await supabase.from("activities").insert(payload);
    }

    setIsDialogOpen(false);
    setSelectedActivity(null);
    setForm({ title: "", activity_date: "", category: "worship", youtube_url: "" });
    loadActivities();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this activity?")) {
      await supabase.from("activities").delete().eq("id", id);
      loadActivities();
    }
  };

  const openDialog = (activity?: Activity) => {
    if (activity) {
      setSelectedActivity(activity);
      setForm({
        title: activity.title,
        activity_date: activity.activity_date,
        category: activity.category,
        youtube_url: activity.youtube_url,
      });
    } else {
      setSelectedActivity(null);
      setForm({ title: "", activity_date: "", category: "worship", youtube_url: "" });
    }
    setIsDialogOpen(true);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      worship: "bg-amber-100 text-amber-800",
      outreach: "bg-emerald-100 text-emerald-800",
      event: "bg-blue-100 text-blue-800",
      programme: "bg-purple-100 text-purple-800",
      other: "bg-gray-100 text-gray-800",
    };
    return colors[category] || colors.other;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Activities</h1>
          <p className="text-stone-600 mt-1">Manage church activities and YouTube videos.</p>
        </div>
        <Button onClick={() => openDialog()} className="bg-stone-800 hover:bg-stone-700">
          <Plus className="mr-2 h-4 w-4" />
          Add Activity
        </Button>
      </div>

      <div className="grid gap-4">
        {activities.map((activity) => (
          <Card key={activity.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(activity.category)}`}>
                      {categories.find(c => c.value === activity.category)?.label}
                    </span>
                    <span className="text-sm text-stone-500 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(activity.activity_date)}
                    </span>
                  </div>
                  <h3 className="font-medium text-stone-900">{activity.title}</h3>
                  <a
                    href={activity.youtube_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline flex items-center gap-1 mt-1"
                  >
                    <Play className="h-3 w-3" />
                    Watch on YouTube
                  </a>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openDialog(activity)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(activity.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {activities.length === 0 && (
        <div className="text-center py-12 text-stone-500">
          No activities yet. Click "Add Activity" to create one.
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedActivity ? "Edit Activity" : "Add Activity"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Activity title"
              />
            </div>
            <div className="space-y-2">
              <Label>Date</Label>
              <Input
                type="date"
                value={form.activity_date}
                onChange={(e) => setForm({ ...form, activity_date: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as Activity["category"] })}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label>YouTube URL</Label>
              <Input
                value={form.youtube_url}
                onChange={(e) => setForm({ ...form, youtube_url: e.target.value })}
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-stone-800 hover:bg-stone-700">
                Save Activity
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
