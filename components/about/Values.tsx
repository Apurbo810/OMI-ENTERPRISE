"use client";

import { useRef } from "react";
import { Briefcase, ShieldCheck, Smile, Truck } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import SectionHeading from "@/components/shared/SectionHeading";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const VALUES = [
  { key: "quality", icon: ShieldCheck },
  { key: "reliable", icon: Truck },
  { key: "professional", icon: Briefcase },
  { key: "satisfaction", icon: Smile },
] as const;

export default function Values() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".value-item", {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: ".value-grid", start: "top 85%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="bg-[#10243A] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          light
          eyebrow={t.about.values.eyebrow}
          title={t.about.values.title}
          description={t.about.values.description}
        />
        <div className="value-grid mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map(({ key, icon: Icon }) => (
            <div
              key={key}
              className="value-item rounded-lg border border-white/10 bg-[#1B3655] p-7"
            >
              <Icon size={28} className="text-[#C6A15B]" />
              <h3 className="mt-5 text-lg font-semibold text-white">
                {t.about.values.items[key].title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                {t.about.values.items[key].description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}