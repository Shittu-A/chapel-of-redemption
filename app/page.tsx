import { Metadata } from "next";
import Hero from "@/components/hero";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Users, Heart, BookOpen } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Chapel of Redemption | ABU Samaru",
  description: "Welcome to Chapel of Redemption, Ahmadu Bello University, Samaru, Zaria. A place of worship, community, and spiritual growth for students, staff, and the local community.",
  keywords: ["Chapel of Redemption", "ABU Samaru", "church", "worship", "Zaria", "Christian"],
  openGraph: {
    title: "Chapel of Redemption | ABU Samaru",
    description: "A place of worship, community, and spiritual growth for students, staff, and the local community.",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero
        title="Welcome to Chapel of Redemption"
        subtitle="A place of worship, community, and spiritual growth for students, staff, and the local community at Ahmadu Bello University, Samaru, Zaria."
        ctas={[
          { label: "Join Us for Service", href: "#services", variant: "primary" },
          { label: "Watch Online", href: "/activities", variant: "secondary" },
        ]}
        backgroundColor="bg-stone-900"
        align="center"
        size="lg"
      />

      {/* Service Times Section */}
      <section id="services" className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-900">Service Times</h2>
            <p className="mt-4 text-lg text-stone-600">Join us for worship and fellowship</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl bg-stone-50 p-8 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-stone-200">
                <BookOpen className="h-6 w-6 text-stone-700" />
              </div>
              <h3 className="text-xl font-semibold text-stone-900">Sunday Service</h3>
              <p className="mt-2 text-stone-600">8:00 AM - 11:00 AM</p>
              <p className="text-sm text-stone-500">Main Sanctuary</p>
            </div>
            <div className="rounded-2xl bg-stone-50 p-8 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-stone-200">
                <Users className="h-6 w-6 text-stone-700" />
              </div>
              <h3 className="text-xl font-semibold text-stone-900">Bible Study</h3>
              <p className="mt-2 text-stone-600">Tuesday & Thursday</p>
              <p className="text-sm text-stone-500">5:00 PM - 6:30 PM</p>
            </div>
            <div className="rounded-2xl bg-stone-50 p-8 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-stone-200">
                <Heart className="h-6 w-6 text-stone-700" />
              </div>
              <h3 className="text-xl font-semibold text-stone-900">Prayer Meeting</h3>
              <p className="mt-2 text-stone-600">Saturday</p>
              <p className="text-sm text-stone-500">6:00 AM - 7:30 AM</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Video Section */}
      <section className="bg-stone-100 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold text-stone-900 mb-4">Latest Sermon</h2>
              <p className="text-lg text-stone-600 mb-6">
                Watch our latest message and be inspired by God&apos;s Word. 
                Subscribe to our YouTube channel for more content.
              </p>
              <Button asChild className="bg-stone-800 hover:bg-stone-700">
                <Link href="/activities">
                  <Play className="mr-2 h-4 w-4" />
                  Watch More Videos
                </Link>
              </Button>
            </div>
            <div className="aspect-video rounded-2xl overflow-hidden bg-stone-200 shadow-lg">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Latest Sermon"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-900">Explore Our Church</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/about"
              className="group rounded-2xl bg-stone-50 p-6 transition-colors hover:bg-stone-100"
            >
              <h3 className="text-lg font-semibold text-stone-900 group-hover:text-stone-700">
                About Us
              </h3>
              <p className="mt-2 text-sm text-stone-600">Learn about our history and mission</p>
              <ArrowRight className="mt-4 h-5 w-5 text-stone-400 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/missions"
              className="group rounded-2xl bg-stone-50 p-6 transition-colors hover:bg-stone-100"
            >
              <h3 className="text-lg font-semibold text-stone-900 group-hover:text-stone-700">
                Our Teams
              </h3>
              <p className="mt-2 text-sm text-stone-600">Meet our ministry teams</p>
              <ArrowRight className="mt-4 h-5 w-5 text-stone-400 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/chad-missions"
              className="group rounded-2xl bg-stone-50 p-6 transition-colors hover:bg-stone-100"
            >
              <h3 className="text-lg font-semibold text-stone-900 group-hover:text-stone-700">
                Chad Missions
              </h3>
              <p className="mt-2 text-sm text-stone-600">Our mission work in Chad</p>
              <ArrowRight className="mt-4 h-5 w-5 text-stone-400 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/giving"
              className="group rounded-2xl bg-stone-50 p-6 transition-colors hover:bg-stone-100"
            >
              <h3 className="text-lg font-semibold text-stone-900 group-hover:text-stone-700">
                Give
              </h3>
              <p className="mt-2 text-sm text-stone-600">Support our ministry</p>
              <ArrowRight className="mt-4 h-5 w-5 text-stone-400 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
