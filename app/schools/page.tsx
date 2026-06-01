import { Metadata } from "next";
import Hero from "@/components/hero";
import { GraduationCap, BookOpen, Users, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Schools | Chapel of Redemption ABU Samaru",
  description: "Discover our educational institutions and programs at Chapel of Redemption, providing quality Christian education for all ages.",
  keywords: ["Chapel of Redemption", "schools", "education", "Christian education", "ABU Samaru"],
};

export default function SchoolsPage() {
  return (
    <div className="flex flex-col">
      <Hero
        title="Our Schools"
        subtitle="Providing quality Christian education to nurture minds and transform lives."
        backgroundColor="bg-stone-800"
        align="center"
        size="md"
      />

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-900">Educational Programs</h2>
            <p className="mt-4 text-lg text-stone-600">Building foundations for a brighter future</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl bg-stone-50 p-8">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-stone-200">
                <GraduationCap className="h-7 w-7 text-stone-700" />
              </div>
              <h3 className="text-xl font-semibold text-stone-900 mb-4">Sunday School</h3>
              <p className="text-stone-600 mb-4">
                Our Sunday School program provides age-appropriate biblical education 
                for children and teenagers. Classes are held every Sunday at 9:00 AM, 
                featuring interactive lessons, activities, and memory verses.
              </p>
              <ul className="space-y-2 text-sm text-stone-600">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-stone-400" />
                  Ages 3-5: Beginners Class
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-stone-400" />
                  Ages 6-8: Primary Class
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-stone-400" />
                  Ages 9-12: Junior Class
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-stone-400" />
                  Ages 13-17: Teen Class
                </li>
              </ul>
            </div>
            <div className="rounded-2xl bg-stone-50 p-8">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-stone-200">
                <BookOpen className="h-7 w-7 text-stone-700" />
              </div>
              <h3 className="text-xl font-semibold text-stone-900 mb-4">Bible Study Institute</h3>
              <p className="text-stone-600 mb-4">
                Deepen your understanding of Scripture through our comprehensive Bible 
                Study Institute. Courses range from foundational studies to advanced 
                theological training, available for all levels of spiritual maturity.
              </p>
              <ul className="space-y-2 text-sm text-stone-600">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-stone-400" />
                  Foundation of Faith
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-stone-400" />
                  Biblical Hermeneutics
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-stone-400" />
                  Church History
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-stone-400" />
                  Practical Ministry
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-stone-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-900">Why Choose Our Schools</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: BookOpen,
                title: "Biblical Foundation",
                description: "All teachings rooted in Scripture",
              },
              {
                icon: Users,
                title: "Experienced Teachers",
                description: "Dedicated and qualified instructors",
              },
              {
                icon: Award,
                title: "Quality Education",
                description: "High standards of academic excellence",
              },
              {
                icon: GraduationCap,
                title: "Holistic Development",
                description: "Spiritual, mental, and social growth",
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
    </div>
  );
}
