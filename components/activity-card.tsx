"use client";

import Image from "next/image";
import { Play, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { getYouTubeThumbnailUrl, extractYouTubeVideoId } from "@/lib/youtube";

type Category = "worship" | "outreach" | "event" | "programme" | "other";

interface ActivityCardProps {
  title: string;
  date: string;
  category: Category;
  youtubeUrl: string;
  onClick: () => void;
}

const categoryColors: Record<Category, string> = {
  worship: "bg-amber-100 text-amber-800",
  outreach: "bg-emerald-100 text-emerald-800",
  event: "bg-blue-100 text-blue-800",
  programme: "bg-purple-100 text-purple-800",
  other: "bg-gray-100 text-gray-800",
};

const categoryLabels: Record<Category, string> = {
  worship: "Worship",
  outreach: "Outreach",
  event: "Event",
  programme: "Programme",
  other: "Other",
};

export function ActivityCard({
  title,
  date,
  category,
  youtubeUrl,
  onClick,
}: ActivityCardProps) {
  const videoId = extractYouTubeVideoId(youtubeUrl);
  const thumbnailUrl = videoId ? getYouTubeThumbnailUrl(videoId, "mqdefault") : null;

  return (
    <button
      onClick={onClick}
      className="group w-full text-left transition-all duration-300 hover:-translate-y-1 focus:outline-none rounded-xl"
    >
      <div className="overflow-hidden rounded-xl bg-white shadow-md transition-shadow duration-300 hover:shadow-xl">
        <div className="relative aspect-video w-full overflow-hidden bg-stone-200">
          {thumbnailUrl ? (
            <Image
              src={thumbnailUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-stone-300">
              <Play className="h-12 w-12 text-stone-400" />
            </div>
          )}
          
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors duration-300 group-hover:bg-black/40">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:bg-white">
              <Play className="ml-1 h-6 w-6 text-stone-900" fill="currentColor" />
            </div>
          </div>

          <div className="absolute left-3 top-3">
            <span
              className={cn(
                "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
                categoryColors[category]
              )}
            >
              {categoryLabels[category]}
            </span>
          </div>
        </div>

        <div className="p-4">
          <h3 className="line-clamp-2 text-base font-semibold text-stone-900 transition-colors group-hover:text-stone-700 sm:text-lg">
            {title}
          </h3>
          <div className="mt-2 flex items-center gap-2 text-sm text-stone-500">
            <Calendar className="h-4 w-4" />
            <time>{date}</time>
          </div>
        </div>
      </div>
    </button>
  );
}
