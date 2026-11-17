"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { HERO } from "@/data/hero";
import { useLanguage } from "@/components/providers/LanguageProvider";

gsap.registerPlugin(useGSAP);

export default function Hero() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.from(".hero-bg", { scale: 1.08, duration: 1.8, ease: "power2.out" }, 0)
          .from(".hero-eyebrow", { y: 20, opacity: 0, duration: 0.6 }, 0.2)
          .from(".hero-title span", { yPercent: 110, opacity: 0, duration: 0.9, stagger: 0.12 }, 0.35)
          .from(".hero-text", { y: 20, opacity: 0, duration: 0.7 }, 0.85)
          .from(".hero-cta", { y: 20, opacity: 0, duration: 0.6, stagger: 0.1 }, 1.0);
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden bg-[#10243A] lg:min-h-[calc(100svh-5rem)]"
    >
      {/* Background image */}
      <div className="hero-bg absolute inset-0">
        <Image
          src={HERO.image.src}
          alt={t.hero[HERO.image.altKey]}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Navy overlay for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#10243A]/95 via-[#10243A]/75 to-[#10243A]/40" />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="hero-eyebrow mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#C6A15B] sm:text-sm">
            {t.hero.eyebrow}
          </p>

          <h1 className="hero-title text-4xl font-bold leading-[1.15] text-white sm:text-5xl lg:text-6xl">
            <span className="block overflow-hidden pb-1">
              <span className="block">{t.hero.titleLine1}</span>
            </span>
            <span className="block overflow-hidden pb-1 text-[#C6A15B]">
              <span className="block">{t.hero.titleLine2}</span>
            </span>
          </h1>

          <p className="hero-text mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
            {t.hero.description}
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href={HERO.primaryCta.href}
              className="hero-cta inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#C6A15B] px-7 py-3 font-semibold text-[#10243A] transition-colors hover:bg-[#D9BC82]"
            >
              {t.hero[HERO.primaryCta.key]}
              <ArrowRight size={18} />
            </Link>
            <Link
              href={HERO.secondaryCta.href}
              className="hero-cta inline-flex min-h-12 items-center justify-center rounded-md border border-white/40 px-7 py-3 font-semibold text-white transition-colors hover:border-[#D9BC82] hover:text-[#D9BC82]"
            >
              {t.hero[HERO.secondaryCta.key]}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}