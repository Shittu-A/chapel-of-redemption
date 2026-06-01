import Image from "next/image";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

interface StaffMember {
  id: string;
  name: string;
  role: string;
  yearsOfService: string;
  image?: string;
}

interface StaffCardProps {
  staff: StaffMember;
  isPast?: boolean;
  className?: string;
}

export default function StaffCard({ staff, isPast = false, className }: StaffCardProps) {
  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-stone-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
        isPast && "opacity-90",
        className
      )}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
        {staff.image ? (
          <Image
            src={staff.image}
            alt={staff.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-stone-100">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-stone-200">
              <User className="h-12 w-12 text-stone-400" />
            </div>
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        {isPast && (
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center rounded-full bg-stone-800/90 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
              Honored Member
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col p-5 md:p-6">
        <h3 className="text-lg md:text-xl font-bold text-stone-900 mb-1 line-clamp-1">
          {staff.name}
        </h3>
        <p className="text-sm md:text-base font-medium text-stone-600 mb-3">
          {staff.role}
        </p>
        
        <div className="mt-auto flex items-center gap-2 text-xs md:text-sm text-stone-500">
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{isPast ? "Served: " : ""}{staff.yearsOfService}</span>
        </div>
      </div>
    </div>
  );
}
