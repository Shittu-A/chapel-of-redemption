import Link from "next/link";
import { ArrowRight, Calendar, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface Newsletter {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}

interface NewsletterCardProps {
  newsletter: Newsletter;
  className?: string;
}

export default function NewsletterCard({ newsletter, className }: NewsletterCardProps) {
  const formattedDate = new Date(newsletter.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-stone-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
        className
      )}
    >
      <div className="relative h-32 bg-gradient-to-br from-stone-800 to-stone-600 p-6 flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
          <FileText className="h-6 w-6 text-white" />
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-white">
          <Calendar className="h-3.5 w-3.5" />
          {formattedDate}
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5 md:p-6">
        <h3 className="text-lg md:text-xl font-bold text-stone-900 mb-2 line-clamp-2 group-hover:text-stone-700 transition-colors">
          {newsletter.title}
        </h3>
        <p className="text-sm text-stone-600 mb-4 line-clamp-3 flex-1">
          {newsletter.excerpt}
        </p>

        <Link
          href={`/newsletter/${newsletter.slug}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-stone-800 hover:text-stone-600 transition-colors mt-auto"
        >
          Read Full Issue
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
