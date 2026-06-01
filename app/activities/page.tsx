"use client";

import { useState, useMemo } from "react";
import Hero from "@/components/hero";
import { ActivityCard } from "@/components/activity-card";
import { YouTubePlayer } from "@/components/youtube-player";
import { cn } from "@/lib/utils";

type Category = "all" | "worship" | "outreach" | "event" | "programme" | "other";

interface Activity {
  id: string;
  title: string;
  date: string;
  category: Exclude<Category, "all">;
  youtubeUrl: string;
}

const activities: Activity[] = [
  {
    id: "1",
    title: "Sunday Worship Service - January 2025",
    date: "January 12, 2025",
    category: "worship",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: "2",
    title: "Community Outreach Program - Zaria",
    date: "January 8, 2025",
    category: "outreach",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: "3",
    title: "Youth Fellowship Convention 2025",
    date: "December 28, 2024",
    category: "event",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: "4",
    title: "Weekly Bible Study Programme",
    date: "December 22, 2024",
    category: "programme",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: "5",
    title: "Christmas Carol Service",
    date: "December 20, 2024",
    category: "worship",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: "6",
    title: "Missions Week Highlights",
    date: "December 15, 2024",
    category: "outreach",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
];

const categories: { value: Category; label: string }[] = [
  { value: "all", label: "All" },
  { value: "worship", label: "Worship" },
  { value: "outreach", label: "Outreach" },
  { value: "event", label: "Events" },
  { value: "programme", label: "Programmes" },
  { value: "other", label: "Other" },
];

export default function ActivitiesPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  const filteredActivities = useMemo(() => {
    if (selectedCategory === "all") return activities;
    return activities.filter((activity) => activity.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-white">
      <Hero
        title="Our Activities"
        subtitle="Watch our worship services, outreach programs, events, and more. Stay connected with the Chapel of Redemption community."
        size="md"
        align="center"
        ctas={[
          {
            label: "Subscribe to Channel",
            href: "https://www.youtube.com/@ChapelOfRedemptionABUSamaru",
            variant: "primary",
          },
        ]}
      />

      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all",
                selectedCategory === category.value
                  ? "bg-stone-900 text-white shadow-md"
                  : "bg-stone-100 text-stone-700 hover:bg-stone-200"
              )}
            >
              {category.label}
            </button>
          ))}
        </div>

        <p className="mb-6 text-center text-sm text-stone-500">
          Showing {filteredActivities.length} {filteredActivities.length === 1 ? "activity" : "activities"}
          {selectedCategory !== "all" && ` in ${categories.find(c => c.value === selectedCategory)?.label}`}
        </p>

        {filteredActivities.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredActivities.map((activity) => (
              <ActivityCard
                key={activity.id}
                title={activity.title}
                date={activity.date}
                category={activity.category}
                youtubeUrl={activity.youtubeUrl}
                onClick={() => setSelectedActivity(activity)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 rounded-full bg-stone-100 p-4">
              <svg
                className="h-8 w-8 text-stone-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-stone-900">
              No activities found
            </h3>
            <p className="mt-1 text-stone-500">
              Try selecting a different category
            </p>
          </div>
        )}
      </section>

      <YouTubePlayer
        isOpen={!!selectedActivity}
        onClose={() => setSelectedActivity(null)}
        youtubeUrl={selectedActivity?.youtubeUrl || ""}
        title={selectedActivity?.title}
      />
    </div>
  );
}
