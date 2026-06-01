/**
 * YouTube utility functions for video handling
 */

/**
 * Extract YouTube video ID from various URL formats
 */
export function extractYouTubeVideoId(url: string): string | null {
  if (!url) return null;

  const patterns = [
    // Standard watch URL: youtube.com/watch?v=VIDEO_ID
    /(?:youtube\.com\/watch\?v=|youtube\.com\/watch\?.*&v=)([a-zA-Z0-9_-]{11})/,
    // Short URL: youtu.be/VIDEO_ID
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    // Embed URL: youtube.com/embed/VIDEO_ID
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    // Shorts URL: youtube.com/shorts/VIDEO_ID
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
    // Live URL: youtube.com/live/VIDEO_ID
    /youtube\.com\/live\/([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

/**
 * Get YouTube thumbnail URL for a video ID
 */
export function getYouTubeThumbnailUrl(
  videoId: string,
  quality: "default" | "mqdefault" | "hqdefault" | "sddefault" | "maxresdefault" = "mqdefault"
): string {
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}

/**
 * Get YouTube embed URL for a video ID
 */
export function getYouTubeEmbedUrl(
  videoId: string,
  options: {
    autoplay?: boolean;
    controls?: boolean;
    rel?: boolean;
    modestbranding?: boolean;
  } = {}
): string {
  const params = new URLSearchParams();

  if (options.autoplay) params.set("autoplay", "1");
  if (options.controls !== false) params.set("controls", "1");
  if (options.rel === false) params.set("rel", "0");
  if (options.modestbranding) params.set("modestbranding", "1");

  params.set("enablejsapi", "1");
  params.set("origin", typeof window !== "undefined" ? window.location.origin : "");

  const queryString = params.toString();
  return `https://www.youtube.com/embed/${videoId}${queryString ? "?" + queryString : ""}`;
}

/**
 * Get YouTube watch URL for a video ID
 */
export function getYouTubeWatchUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

/**
 * Validate if a URL is a valid YouTube URL
 */
export function isValidYouTubeUrl(url: string): boolean {
  return extractYouTubeVideoId(url) !== null;
}

/**
 * Get video duration in human-readable format
 * Note: This requires the YouTube Data API
 */
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  }

  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}
