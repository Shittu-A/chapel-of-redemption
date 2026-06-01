import Image from "next/image";
import { cn } from "@/lib/utils";

interface TeamCardProps {
  name: string;
  role: string;
  photoUrl?: string;
  className?: string;
}

export default function TeamCard({ name, role, photoUrl, className }: TeamCardProps) {
  return (
    <div className={cn("group flex flex-col items-center text-center", className)}>
      <div className="relative mb-4 overflow-hidden rounded-full bg-stone-200">
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={name}
            width={160}
            height={160}
            className="h-32 w-32 object-cover transition-transform duration-300 group-hover:scale-105 md:h-40 md:w-40"
          />
        ) : (
          <div className="flex h-32 w-32 items-center justify-center bg-stone-200 text-stone-400 md:h-40 md:w-40">
            <svg
              className="h-12 w-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        )}
      </div>
      <h3 className="text-lg font-semibold text-stone-900 md:text-xl">{name}</h3>
      <p className="text-sm text-stone-600 md:text-base">{role}</p>
    </div>
  );
}
