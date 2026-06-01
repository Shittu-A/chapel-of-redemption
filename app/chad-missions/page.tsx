import { Metadata } from "next";
import Hero from "@/components/hero";
import { Globe, Heart, Users, Church } from "lucide-react";

export const metadata: Metadata = {
  title: "Chad Missions | Chapel of Redemption ABU Samaru",
  description: "Learn about our mission work in Chad, spreading the Gospel and serving communities through Chapel of Redemption's outreach programs.",
  keywords: ["Chapel of Redemption", "missions", "Chad", "outreach", "mission work", "Africa"],
};

export default function ChadMissionsPage() {
  return (
    <div className="flex flex-col">
      <Hero
        title="Chad Missions"
        subtitle="Spreading the Gospel and serving communities in Chad through our mission outreach programs."
        backgroundColor="bg-stone-800"
        align="center"
        size="md"
      />

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold text-stone-900 mb-6">Our Mission in Chad</h2>
              <div className="space-y-4 text-stone-600">
                <p>
                  Chapel of Redemption has been actively involved in mission work in Chad 
                  since 2010. Our mission teams travel regularly to support local churches, 
                  provide humanitarian aid, and share the love of Christ with communities 
                  in need.
                </p>
                <p>
                  Through partnerships with local churches and organizations, we have 
                  established sustainable programs that address both spiritual and physical 
                  needs. Our work includes evangelism, discipleship training, medical 
                  outreach, and community development projects.
                </p>
                <p>
                  We believe that every person deserves to hear the Gospel and experience 
                  God&apos;s love in practical ways. Our mission in Chad is a testament to this 
                  commitment.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl bg-stone-200 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-stone-300 to-stone-400 flex items-center justify-center">
                  <Globe className="h-24 w-24 text-stone-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-stone-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-900">What We Do</h2>
            <p className="mt-4 text-lg text-stone-600">Our mission activities in Chad</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Church,
                title: "Church Planting",
                description: "Establishing new churches and strengthening existing ones",
              },
              {
                icon: Users,
                title: "Leadership Training",
                description: "Equipping local leaders with biblical knowledge and skills",
              },
              {
                icon: Heart,
                title: "Humanitarian Aid",
                description: "Providing food, medical care, and education support",
              },
              {
                icon: Globe,
                title: "Community Development",
                description: "Building sustainable infrastructure and programs",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-white p-6 text-center shadow-sm"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-stone-100">
                  <item.icon className="h-6 w-6 text-stone-700" />
                </div>
                <h3 className="text-lg font-semibold text-stone-900">{item.title}</h3>
                <p className="mt-2 text-sm text-stone-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-stone-900 p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Support Our Mission
            </h2>
            <p className="text-stone-300 max-w-2xl mx-auto mb-8">
              Your prayers and financial support enable us to continue this vital work. 
              Join us in making a difference in Chad.
            </p>
            <a
              href="/giving"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold text-stone-900 transition-colors hover:bg-stone-100"
            >
              Give to Missions
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
