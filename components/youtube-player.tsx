"use client";

import { useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { extractYouTubeVideoId, getYouTubeEmbedUrl } from "@/lib/youtube";

interface YouTubePlayerProps {
  isOpen: boolean;
  onClose: () => void;
  youtubeUrl: string;
  title?: string;
}

export function YouTubePlayer({ isOpen, onClose, youtubeUrl, title }: YouTubePlayerProps) {
  const videoId = extractYouTubeVideoId(youtubeUrl);
  const embedUrl = videoId ? getYouTubeEmbedUrl(videoId, { autoplay: true }) : null;

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
    >
      <div className="relative w-full max-w-5xl animate-in zoom-in-95 duration-200">
        <div className="absolute -top-12 right-0 flex items-center gap-3">
          {title && (
            <h2
              id="video-modal-title"
              className="hidden text-sm font-medium text-white sm:block"
            >
              {title}
            </h2>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full bg-white/10 text-white hover:bg-white/20 hover:text-white"
            aria-label="Close video"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black shadow-2xl">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={title || "YouTube video player"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <p className="text-center text-white">
                Invalid YouTube URL
                <br />
                <span className="text-sm text-white/60">{youtubeUrl}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
