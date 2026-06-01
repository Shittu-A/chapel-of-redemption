import { Metadata } from "next";
import Hero from "@/components/hero";
import NewsletterCard from "@/components/newsletter-card";

export const metadata: Metadata = {
  title: "Newsletter Archive | Chapel of Redemption ABU Samaru",
  description: "Stay updated with our monthly newsletters, announcements, and church news from Chapel of Redemption ABU Samaru.",
  keywords: ["Chapel of Redemption", "newsletter", "updates", "announcements", "church news"],
};

const newsletters = [
  {
    id: "1",
    slug: "january-2025",
    title: "January 2025: New Year, New Beginnings",
    date: "2025-01-05",
    excerpt: "As we step into 2025, we reflect on God's faithfulness and look forward to the blessings He has in store for our church family. Join us for our special New Year prayer week.",
  },
  {
    id: "2",
    slug: "december-2024",
    title: "December 2024: Christmas Celebration",
    date: "2024-12-01",
    excerpt: "Celebrate the birth of our Savior with us! Read about our Christmas services, carol night, and the annual end-of-year thanksgiving. Special highlights from our outreach programs.",
  },
  {
    id: "3",
    slug: "november-2024",
    title: "November 2024: Month of Thanksgiving",
    date: "2024-11-01",
    excerpt: "Join us as we express our gratitude to God for His countless blessings. Featuring testimonies from church members and updates on our mission work in Chad.",
  },
  {
    id: "4",
    slug: "october-2024",
    title: "October 2024: Youth Month",
    date: "2024-10-01",
    excerpt: "Empowering the next generation! Discover what our youth ministry has been up to and upcoming events designed to inspire and equip our young people for Christ.",
  },
  {
    id: "5",
    slug: "september-2024",
    title: "September 2024: Back to School",
    date: "2024-09-01",
    excerpt: "Prayers and blessings for students returning to campus. Learn about our student fellowship programs and how we're supporting the ABU community this semester.",
  },
  {
    id: "6",
    slug: "august-2024",
    title: "August 2024: Summer Outreach",
    date: "2024-08-01",
    excerpt: "Our summer missions report, including the medical outreach to rural communities and the youth camp highlights. See how God is using us to spread His love.",
  },
];

export default function NewsletterPage() {
  return (
    <div className="min-h-screen bg-white">
      <Hero
        title="Newsletter Archive"
        subtitle="Stay connected with our church community. Read past newsletters for updates, testimonies, and announcements."
        backgroundColor="bg-stone-800"
        align="center"
        size="md"
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-stone-600 max-w-2xl mx-auto">
              Browse our collection of newsletters to stay informed about church activities, 
              read inspiring testimonies, and keep up with community events.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {newsletters.map((newsletter) => (
              <NewsletterCard key={newsletter.id} newsletter={newsletter} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <button className="inline-flex items-center justify-center rounded-full bg-stone-800 px-8 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-stone-700 hover:shadow-md">
              Load More Newsletters
            </button>
          </div>
        </div>
      </section>

      <section className="bg-stone-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-stone-600 mb-8">
              Get the latest updates delivered directly to your inbox. Stay connected with our church family.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-lg border border-stone-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="rounded-lg bg-stone-800 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-stone-700"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
