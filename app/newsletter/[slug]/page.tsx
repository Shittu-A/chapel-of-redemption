import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Hero from "@/components/hero";
import { ArrowLeft, Calendar, Clock, Share2, Printer } from "lucide-react";

interface NewsletterPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const newsletters = [
  {
    id: "1",
    slug: "january-2025",
    title: "January 2025: New Year, New Beginnings",
    date: "2025-01-05",
    readTime: "5 min read",
    excerpt: "As we step into 2025, we reflect on God's faithfulness...",
    content: {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "A Message from Our Pastor" }],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Dear beloved family in Christ, as we enter this new year, I am filled with gratitude for God's faithfulness to our church family. The past year has been a testament to His enduring love and provision.",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "This month, we embark on our annual prayer and fasting program. I encourage each of you to participate wholeheartedly as we seek God's direction for 2025.",
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Upcoming Events" }],
        },
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "New Year Prayer Week - January 6-12, 6:00 AM daily",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Youth Fellowship Convention - January 18-19",
                    },
                  ],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Community Outreach - January 25",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Testimony Corner" }],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: 'Sister Grace shares: "I am thankful to God for healing my mother after a prolonged illness. The prayers of this church family have been a source of strength throughout this journey."',
            },
          ],
        },
      ],
    },
  },
  {
    id: "2",
    slug: "december-2024",
    title: "December 2024: Christmas Celebration",
    date: "2024-12-01",
    readTime: "4 min read",
    excerpt: "Celebrate the birth of our Savior with us!",
    content: {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Christmas at Chapel of Redemption" }],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "The season of Advent is upon us, and we invite you to join us as we celebrate the miracle of Christmas. Our services this month are designed to help us reflect on the true meaning of the season.",
            },
          ],
        },
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Service Schedule" }],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Christmas Eve Service - December 24 at 6:00 PM\nChristmas Day Service - December 25 at 9:00 AM\nEnd of Year Thanksgiving - December 31 at 10:00 PM",
            },
          ],
        },
      ],
    },
  },
];

export async function generateStaticParams() {
  return newsletters.map((newsletter) => ({
    slug: newsletter.slug,
  }));
}

export async function generateMetadata({ params }: NewsletterPageProps): Promise<Metadata> {
  const { slug } = await params;
  const newsletter = newsletters.find((n) => n.slug === slug);
  
  if (!newsletter) {
    return {
      title: "Newsletter Not Found",
    };
  }

  return {
    title: `${newsletter.title} | Chapel of Redemption`,
    description: newsletter.excerpt,
  };
}

function renderTiptapNode(node: any): React.ReactNode {
  if (!node) return null;

  switch (node.type) {
    case "doc":
      return (
        <div className="space-y-4">
          {node.content?.map((child: any, index: number) => (
            <div key={index}>{renderTiptapNode(child)}</div>
          ))}
        </div>
      );

    case "heading":
      const level = node.attrs?.level || 2;
      const HeadingTag = `h${level}` as React.ElementType;
      return (
        <HeadingTag className="text-xl md:text-2xl font-bold text-stone-900 mt-8 mb-4">
          {node.content?.map((child: any, index: number) => (
            <span key={index}>{renderTiptapNode(child)}</span>
          ))}
        </HeadingTag>
      );

    case "paragraph":
      return (
        <p className="text-stone-700 leading-relaxed">
          {node.content?.map((child: any, index: number) => (
            <span key={index}>{renderTiptapNode(child)}</span>
          ))}
        </p>
      );

    case "text":
      return node.text;

    case "bulletList":
      return (
        <ul className="list-disc list-inside space-y-2 text-stone-700 ml-4">
          {node.content?.map((child: any, index: number) => (
            <li key={index}>{renderTiptapNode(child)}</li>
          ))}
        </ul>
      );

    case "listItem":
      return (
        <span>
          {node.content?.map((child: any, index: number) => (
            <span key={index}>{renderTiptapNode(child)}</span>
          ))}
        </span>
      );

    default:
      return null;
  }
}

export default async function SingleNewsletterPage({ params }: NewsletterPageProps) {
  const { slug } = await params;
  const newsletter = newsletters.find((n) => n.slug === slug);

  if (!newsletter) {
    notFound();
  }

  const formattedDate = new Date(newsletter.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-white">
      <Hero
        title={newsletter.title}
        subtitle={`Published on ${formattedDate} • ${newsletter.readTime}`}
        backgroundColor="bg-stone-800"
        align="center"
        size="sm"
      />

      <article className="py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/newsletter"
            className="mb-8 inline-flex items-center text-sm font-medium text-stone-600 hover:text-stone-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Newsletter Archive
          </Link>

          <div className="prose prose-stone max-w-none">
            {renderTiptapNode(newsletter.content)}
          </div>

          <div className="mt-12 flex items-center justify-between border-t border-stone-200 pt-8">
            <div className="flex items-center gap-4">
              <button className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-stone-900">
                <Share2 className="h-4 w-4" />
                Share
              </button>
              <button className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-stone-900">
                <Printer className="h-4 w-4" />
                Print
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
