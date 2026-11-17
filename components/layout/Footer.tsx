"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { NAV_ITEMS } from "@/data/navigation";
import { CONTACT } from "@/data/contact";
import { SOCIAL_LINKS } from "@/data/social";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    // Read the current year after prerendering to keep the route static.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- This Next.js workaround needs one post-prerender state update.
    setCurrentYear(new Date().getFullYear());
  }, []);

  const contactRows = [
    CONTACT.phone && {
      icon: Phone,
      value: CONTACT.phone,
      href: `tel:${CONTACT.phone}`,
    },
    CONTACT.whatsapp && {
      icon: MessageCircle,
      value: `${t.contact.whatsapp}: ${CONTACT.whatsapp}`,
      href: `https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}`,
    },
    CONTACT.email && {
      icon: Mail,
      value: CONTACT.email,
      href: `mailto:${CONTACT.email}`,
    },
    CONTACT.address && {
      icon: MapPin,
      value: CONTACT.address,
      href: undefined,
    },
  ].filter(Boolean) as { icon: typeof Phone; value: string; href?: string }[];

  return (
    <footer className="border-t-4 border-[#C6A15B] bg-[#10243A] text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex flex-col leading-tight">
              <span className="text-xl font-bold tracking-wide">OMI ENTERPRISE</span>
              <span className="text-[11px] uppercase tracking-widest text-[#C6A15B]">
                {t.nav.tagline}
              </span>
            </Link>
            <p className="mt-5 max-w-md leading-relaxed text-white/70">
              {t.footer.description}
            </p>

            {SOCIAL_LINKS.length > 0 && (
              <div className="mt-6">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#C6A15B]">
                  {t.footer.followUs}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {SOCIAL_LINKS.map((s) => (
                    <li key={s.key}>
                      <a
                        href={s.href}
                        target={s.href === "#" ? undefined : "_blank"}
                        rel={s.href === "#" ? undefined : "noopener noreferrer"}
                        className="inline-flex min-h-10 items-center rounded-md border border-white/20 px-4 text-sm transition-colors hover:border-[#C6A15B] hover:text-[#D9BC82]"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Quick links */}
          <nav aria-label="Footer" className="lg:col-span-3">
            <h2 className="mb-5 text-sm font-semibold uppercase tracking-widest text-[#C6A15B]">
              {t.footer.quickLinks}
            </h2>
            <ul className="space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-white/70 transition-colors hover:text-[#D9BC82]"
                  >
                    {t.nav[item.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h2 className="mb-5 text-sm font-semibold uppercase tracking-widest text-[#C6A15B]">
              {t.footer.contactTitle}
            </h2>
            {contactRows.length === 0 ? (
              <p className="text-white/60">{t.footer.notAdded}</p>
            ) : (
              <ul className="space-y-4">
                {contactRows.map(({ icon: Icon, value, href }) => (
                  <li key={value} className="flex items-start gap-3">
                    <Icon size={18} className="mt-1 shrink-0 text-[#C6A15B]" />
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="break-words text-white/70 transition-colors hover:text-[#D9BC82]"
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="break-words text-white/70">{value}</span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-5 text-center text-sm text-white/60 sm:px-6 lg:px-8">
          © {currentYear === null ? null : `${currentYear} `}OMI ENTERPRISE.{" "}
          {t.footer.rights}
        </div>
      </div>
    </footer>
  );
}