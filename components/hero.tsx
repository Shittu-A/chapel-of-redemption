import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CTA {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "outline";
}

interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  backgroundColor?: string;
  ctas?: CTA[];
  align?: "left" | "center" | "right";
  size?: "sm" | "md" | "lg" | "xl";
  overlayOpacity?: number;
  className?: string;
  children?: React.ReactNode;
}

export default function Hero({
  title,
  subtitle,
  backgroundImage,
  backgroundColor = "bg-stone-800",
  ctas = [],
  align = "center",
  size = "lg",
  overlayOpacity = 0.5,
  className,
  children,
}: HeroProps) {
  const alignStyles = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  const sizeStyles = {
    sm: "py-16 md:py-20",
    md: "py-20 md:py-28",
    lg: "py-24 md:py-32 lg:py-40",
    xl: "py-32 md:py-40 lg:py-52",
  };

  const titleSizes = {
    sm: "text-3xl md:text-4xl",
    md: "text-4xl md:text-5xl",
    lg: "text-4xl md:text-5xl lg:text-6xl",
    xl: "text-5xl md:text-6xl lg:text-7xl",
  };

  const subtitleSizes = {
    sm: "text-base md:text-lg",
    md: "text-lg md:text-xl",
    lg: "text-lg md:text-xl lg:text-2xl",
    xl: "text-xl md:text-2xl lg:text-3xl",
  };

  return (
    <section
      className={cn(
        "relative flex w-full overflow-hidden",
        sizeStyles[size],
        className
      )}
    >
      {backgroundImage ? (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div
            className="absolute inset-0 bg-black"
            style={{ opacity: overlayOpacity }}
          />
        </>
      ) : (
        <div className={cn("absolute inset-0", backgroundColor)} />
      )}

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "flex max-w-4xl flex-col gap-4 md:gap-6",
            alignStyles[align],
            align === "center" && "mx-auto"
          )}
        >
          <h1
            className={cn(
              "font-bold leading-tight tracking-tight text-white",
              titleSizes[size]
            )}
          >
            {title}
          </h1>

          {subtitle && (
            <p
              className={cn(
                "max-w-2xl leading-relaxed text-white/90",
                subtitleSizes[size],
                align === "center" && "mx-auto"
              )}
            >
              {subtitle}
            </p>
          )}

          {children}

          {ctas.length > 0 && (
            <div
              className={cn(
                "mt-4 flex flex-wrap gap-3 md:gap-4",
                align === "center" && "justify-center",
                align === "right" && "justify-end"
              )}
            >
              {ctas.map((cta, index) => {
                const isPrimary = cta.variant === "primary" || !cta.variant;
                const isSecondary = cta.variant === "secondary";
                const isOutline = cta.variant === "outline";

                return (
                  <Link
                    key={index}
                    href={cta.href}
                    className={cn(
                      "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all md:px-8 md:py-4 md:text-base",
                      isPrimary &&
                        "bg-white text-stone-900 shadow-lg hover:bg-stone-100 hover:shadow-xl",
                      isSecondary &&
                        "bg-white/20 text-white backdrop-blur-sm hover:bg-white/30",
                      isOutline &&
                        "border-2 border-white text-white hover:bg-white hover:text-stone-900"
                    )}
                  >
                    {cta.label}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
    </section>
  );
}
