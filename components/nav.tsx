"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Cross, ChevronRight } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Missions", href: "/missions" },
  { name: "Activities", href: "/activities" },
  { name: "Chad Missions", href: "/chad-missions" },
  { name: "Schools", href: "/schools" },
  { name: "Staff", href: "/staff" },
  { name: "Newsletter", href: "/newsletter" },
  { name: "Giving", href: "/giving" },
];

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled || isOpen
            ? "bg-white/95 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        )}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-800 transition-transform group-hover:scale-105">
                <Cross className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-tight text-stone-900">
                  Chapel of
                </span>
                <span className="text-sm font-medium leading-tight text-stone-600">
                  Redemption
                </span>
              </div>
            </Link>

            <div className="hidden lg:flex lg:items-center lg:gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium transition-colors rounded-md",
                    isActive(link.href)
                      ? "text-stone-900 bg-stone-100"
                      : "text-stone-600 hover:text-stone-900 hover:bg-stone-50"
                  )}
                >
                  {link.name}
                  {isActive(link.href) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-4 bg-stone-800 rounded-full" />
                  )}
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex lg:items-center">
              <Link
                href="/giving"
                className="inline-flex items-center justify-center rounded-full bg-stone-800 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-stone-700 hover:shadow-md"
              >
                Give Now
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-stone-600 hover:bg-stone-100 hover:text-stone-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-stone-500 lg:hidden"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">
                {isOpen ? "Close menu" : "Open menu"}
              </span>
              {isOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      <div
        id="mobile-menu"
        className={cn(
          "fixed top-0 right-0 bottom-0 z-40 w-full max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b px-4 py-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-800">
                <Cross className="h-4 w-4 text-white" />
              </div>
              <span className="text-base font-bold text-stone-900">
                Chapel of Redemption
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-md p-2 text-stone-600 hover:bg-stone-100 hover:text-stone-900"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            <div className="space-y-1 px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "group flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium transition-colors",
                    isActive(link.href)
                      ? "bg-stone-100 text-stone-900"
                      : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
                  )}
                >
                  <span>{link.name}</span>
                  <ChevronRight
                    className={cn(
                      "h-4 w-4 transition-transform",
                      isActive(link.href)
                        ? "text-stone-900"
                        : "text-stone-400 group-hover:translate-x-1"
                    )}
                  />
                </Link>
              ))}
            </div>
          </div>

          <div className="border-t p-4">
            <Link
              href="/giving"
              onClick={() => setIsOpen(false)}
              className="flex w-full items-center justify-center rounded-full bg-stone-800 px-4 py-3 text-base font-semibold text-white shadow-sm transition-all hover:bg-stone-700"
            >
              Give Now
            </Link>
            <p className="mt-3 text-center text-xs text-stone-500">
              Supporting missions around the world
            </p>
          </div>
        </div>
      </div>

      <div className="h-16" />
    </>
  );
}
