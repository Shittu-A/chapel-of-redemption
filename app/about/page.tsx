import { Metadata } from "next";
import Hero from "@/components/hero";
import { Cross, BookOpen, Heart, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Chapel of Redemption ABU Samaru",
  description: "Learn about Chapel of Redemption, our history, mission, vision, and the community we serve at Ahmadu Bello University, Samaru, Zaria.",
  keywords: ["Chapel of Redemption", "ABU Samaru", "about", "history", "mission", "vision"],
};

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      <Hero
        title="About Us"
        subtitle="Learn about our history, mission, and the community we serve."
        backgroundColor="bg-stone-800"
        align="center"
        size="md"
      />

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold text-stone-900 mb-6">Our History</h2>
              <div className="space-y-4 text-stone-600">
                <p>
                  Chapel of Redemption was established in 1975 as a place of worship 
                  for the Christian community at Ahmadu Bello University, Samaru. 
                  What started as a small gathering of faithful believers has grown 
                  into a vibrant church serving thousands of students, staff, and 
                  members of the local community.
                </p>
                <p>
                  Over the decades, the Chapel has remained committed to its founding 
                  principles of preaching the Gospel, nurturing spiritual growth, and 
                  serving the community through various outreach programs.
                </p>
                <p>
                  Today, Chapel of Redemption stands as a beacon of hope and faith, 
                  continuing to impact lives and transform communities through the 
                  power of God&apos;s Word.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl bg-stone-200 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-stone-300 to-stone-400 flex items-center justify-center">
                  <Cross className="h-24 w-24 text-stone-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-stone-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-900">Our Mission & Vision</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-stone-100">
                <BookOpen className="h-7 w-7 text-stone-700" />
              </div>
              <h3 className="text-xl font-semibold text-stone-900 mb-4">Our Mission</h3>
              <p className="text-stone-600">
                To preach the Gospel of Jesus Christ, disciple believers, and equip 
                them for service in the church and the world. We are committed to 
                nurturing spiritual growth, fostering community, and extending God&apos;s 
                love to all people.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-stone-100">
                <Heart className="h-7 w-7 text-stone-700" />
              </div>
              <h3 className="text-xl font-semibold text-stone-900 mb-4">Our Vision</h3>
              <p className="text-stone-600">
                To be a vibrant, Christ-centered community that transforms lives 
                through the power of the Gospel. We envision a church where every 
                member is equipped to serve, every soul finds salvation, and the 
                love of Christ reaches every corner of our community and beyond.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-900">Our Core Values</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Cross,
                title: "Faith",
                description: "Trusting in God and His promises",
              },
              {
                icon: Heart,
                title: "Love",
                description: "Showing Christ's love to all",
              },
              {
                icon: Users,
                title: "Community",
                description: "Fellowship and mutual support",
              },
              {
                icon: BookOpen,
                title: "Service",
                description: "Serving God and humanity",
              },
            ].map((value) => (
              <div
                key={value.title}
                className="rounded-2xl bg-stone-50 p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-stone-200">
                  <value.icon className="h-6 w-6 text-stone-700" />
                </div>
                <h3 className="text-lg font-semibold text-stone-900">{value.title}</h3>
                <p className="mt-2 text-sm text-stone-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
