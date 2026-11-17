"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import SectionHeading from "@/components/shared/SectionHeading";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function AboutIntro() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".intro-media", {
          x: -40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
        });
        gsap.from(".intro-text > *", {
          y: 24,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="bg-white py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <div className="intro-media relative">
          <div className="absolute -bottom-4 -left-4 h-full w-full rounded-lg border-2 border-[#C6A15B]" />
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[#1B3655]">
            <Image
              src="/images/about/company.jpg"
              alt={t.about.intro.imageAlt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="intro-text">
          <SectionHeading
            align="left"
            eyebrow={t.about.intro.eyebrow}
            title={t.about.intro.title}
          />
          <p className="mt-6 leading-relaxed text-[#10243A]/75">{t.about.intro.p1}</p>
          <p className="mt-4 leading-relaxed text-[#10243A]/75">{t.about.intro.p2}</p>
        </div>
      </div>
    </section>
  );
}