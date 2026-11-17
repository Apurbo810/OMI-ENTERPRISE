"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { NAV_ITEMS, QUOTE_CTA } from "@/data/navigation";
import { useLanguage } from "@/components/providers/LanguageProvider";

gsap.registerPlugin(useGSAP);

export default function Navbar() {
  const { t, locale, setLocale } = useLanguage();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Entrance animation (skipped for reduced motion)
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".nav-anim", {
          y: -14,
          opacity: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: "power2.out",
        });
      });
      return () => mm.revert();
    },
    { scope: headerRef }
  );

  // Close mobile menu on route change
  useEffect(() => setOpen(false), [pathname]);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 bg-[#10243A] border-b border-white/10"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
        {/* Logo (placeholder until real logo is provided) */}
        <Link href="/" className="nav-anim flex flex-col leading-tight">
          <span className="text-lg font-bold tracking-wide text-white">
            OMI ENTERPRISE
          </span>
          <span className="text-[11px] tracking-widest text-[#C6A15B] uppercase">
            {t.nav.tagline}
          </span>
        </Link>

        {/* Desktop links */}
        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <li key={item.key} className="nav-anim">
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`text-sm font-medium transition-colors hover:text-[#D9BC82] ${
                    isActive(item.href) ? "text-[#C6A15B]" : "text-white"
                  }`}
                >
                  {t.nav[item.key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <LanguageSwitch locale={locale} setLocale={setLocale} />

          <Link
            href={QUOTE_CTA.href}
            className="nav-anim hidden rounded-md bg-[#C6A15B] px-5 py-2.5 text-sm font-semibold text-[#10243A] transition-colors hover:bg-[#D9BC82] sm:inline-block"
          >
            {t.nav[QUOTE_CTA.key]}
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            className="flex h-11 w-11 items-center justify-center rounded-md text-white xl:hidden"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="xl:hidden fixed inset-x-0 top-16 bottom-0 overflow-y-auto bg-[#10243A] px-4 pb-10 pt-4 lg:top-20"
        >
          <ul className="flex flex-col">
            {NAV_ITEMS.map((item) => (
              <li key={item.key} className="border-b border-white/10">
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`block py-4 text-lg font-medium ${
                    isActive(item.href) ? "text-[#C6A15B]" : "text-white"
                  }`}
                >
                  {t.nav[item.key]}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={QUOTE_CTA.href}
            className="mt-6 block rounded-md bg-[#C6A15B] py-3.5 text-center font-semibold text-[#10243A]"
          >
            {t.nav[QUOTE_CTA.key]}
          </Link>
        </div>
      )}
    </header>
  );
}

function LanguageSwitch({
  locale,
  setLocale,
}: {
  locale: "en" | "bn";
  setLocale: (l: "en" | "bn") => void;
}) {
  const base = "px-2.5 py-1 text-xs font-semibold rounded transition-colors";
  return (
    <div
      role="group"
      aria-label="Language"
      className="nav-anim flex items-center rounded-md border border-white/20 p-0.5"
    >
      <button
        type="button"
        onClick={() => setLocale("en")}
        aria-pressed={locale === "en"}
        className={`${base} ${locale === "en" ? "bg-[#C6A15B] text-[#10243A]" : "text-white"}`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLocale("bn")}
        aria-pressed={locale === "bn"}
        className={`${base} ${locale === "bn" ? "bg-[#C6A15B] text-[#10243A]" : "text-white"}`}
      >
        বাংলা
      </button>
    </div>
  );
}