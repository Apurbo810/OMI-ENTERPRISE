"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import SectionHeading from "@/components/shared/SectionHeading";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const STEPS = ["inquire", "quote", "confirm", "deliver"] as const;

export default function ProcessSteps() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".step-item", {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: ".step-grid", start: "top 85%", once: true },
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
          eyebrow={t.process.eyebrow}
          title={t.process.title}
          description={t.process.description}
        />
        <ol className="step-grid mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((key, i) => (
            <li
              key={key}
              className="step-item rounded-lg border border-white/10 bg-[#1B3655] p-7"
            >
              <span className="text-4xl font-bold text-[#C6A15B]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-white">
                {t.process.steps[key].title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                {t.process.steps[key].description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}