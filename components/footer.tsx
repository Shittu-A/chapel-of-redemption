import Link from "next/link";
import {
  Cross,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ArrowUpRight,
} from "lucide-react";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Missions", href: "/missions" },
  { name: "Activities", href: "/activities" },
  { name: "Chad Missions", href: "/chad-missions" },
  { name: "Schools", href: "/schools" },
  { name: "Our Staff", href: "/staff" },
  { name: "Newsletter", href: "/newsletter" },
  { name: "Giving", href: "/giving" },
];

const resourceLinks = [
  { name: "Sermons", href: "/activities" },
  { name: "Missions Overview", href: "/missions" },
  { name: "Prayer Requests", href: "/about" },
  { name: "Bible Study", href: "/about" },
  { name: "Youth Ministry", href: "/missions/brigade" },
];

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "https://facebook.com" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com" },
  { name: "YouTube", icon: Youtube, href: "https://youtube.com" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-50 border-t">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
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
            <p className="text-sm text-stone-600 leading-relaxed">
              A place of worship, community, and spiritual growth. Join us as we
              spread the Gospel and serve our local and global communities
              through missions, education, and outreach programs.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white border border-stone-200 text-stone-600 transition-colors hover:bg-stone-800 hover:text-white hover:border-stone-800"
                    aria-label={social.name}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-900 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-sm text-stone-600 transition-colors hover:text-stone-900"
                  >
                    <ArrowUpRight className="mr-1 h-3 w-3 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-900 mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center text-sm text-stone-600 transition-colors hover:text-stone-900"
                  >
                    <ArrowUpRight className="mr-1 h-3 w-3 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-900 mb-4">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-stone-800 shrink-0 mt-0.5" />
                <span className="text-sm text-stone-600">
                  ABU Samaru Campus
                  <br />
                  Zaria, Kaduna State, Nigeria
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-stone-800 shrink-0" />
                <a
                  href="tel:+2340000000000"
                  className="text-sm text-stone-600 hover:text-stone-900 transition-colors"
                >
                  +234 000 000 0000
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-stone-800 shrink-0" />
                <a
                  href="mailto:info@chapelofredemption.org"
                  className="text-sm text-stone-600 hover:text-stone-900 transition-colors"
                >
                  info@chapelofredemption.org
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t bg-stone-100">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-stone-600 text-center md:text-left">
              &copy; {currentYear} Chapel of Redemption ABU Samaru. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="text-sm text-stone-600 hover:text-stone-900 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-stone-600 hover:text-stone-900 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
