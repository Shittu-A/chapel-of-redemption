import { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/hero";
import { Users, Music, Heart, Settings, Code, GraduationCap, Shield, HandHeart } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Teams | Chapel of Redemption ABU Samaru",
  description: "Meet the dedicated teams serving at Chapel of Redemption - Church Council, Deacons, Ushers, Band, Choir, Technical Team, MIS, and Boys & Girls Brigade.",
  keywords: ["Chapel of Redemption", "teams", "ministry", "council", "deacons", "ushers", "choir", "band"],
};

const teams = [
  {
    slug: "council",
    name: "Church Council",
    description: "Spiritual and administrative leadership providing vision and oversight.",
    icon: Shield,
  },
  {
    slug: "deacons",
    name: "Team of Deacons",
    description: "Serving the practical and spiritual needs of our congregation.",
    icon: HandHeart,
  },
  {
    slug: "ushers",
    name: "Team of Ushers",
    description: "Creating a warm, welcoming environment for all worshippers.",
    icon: Users,
  },
  {
    slug: "band",
    name: "Chapel Band",
    description: "Leading dynamic, spirit-filled worship through music.",
    icon: Music,
  },
  {
    slug: "choir",
    name: "Choir",
    description: "Ministering through beautiful harmonies and songs of praise.",
    icon: Heart,
  },
  {
    slug: "technical",
    name: "Technical Team",
    description: "Ensuring every service is seen and heard clearly.",
    icon: Settings,
  },
  {
    slug: "mis",
    name: "MIS Team",
    description: "Managing digital infrastructure and technology.",
    icon: Code,
  },
  {
    slug: "brigade",
    name: "Boys & Girls Brigade",
    description: "Developing character and discipline in young people.",
    icon: GraduationCap,
  },
];

export default function MissionsPage() {
  return (
    <div className="flex flex-col">
      <Hero
        title="Our Teams"
        subtitle="Meet the dedicated teams serving our church community with passion and commitment."
        backgroundColor="bg-stone-800"
        align="center"
        size="md"
      />

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {teams.map((team) => {
              const Icon = team.icon;
              return (
                <Link
                  key={team.slug}
                  href={`/missions/${team.slug}`}
                  className="group relative overflow-hidden rounded-2xl bg-stone-50 p-6 transition-all hover:bg-stone-100 hover:shadow-md"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-stone-200 transition-colors group-hover:bg-stone-300">
                    <Icon className="h-6 w-6 text-stone-700" />
                  </div>
                  <h3 className="text-lg font-semibold text-stone-900 group-hover:text-stone-800">
                    {team.name}
                  </h3>
                  <p className="mt-2 text-sm text-stone-600">
                    {team.description}
                  </p>
                  <div className="mt-4 flex items-center text-sm font-medium text-stone-800">
                    View Team
                    <svg
                      className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
