"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SERVICES } from "@/data/services";
import { useLanguage } from "@/components/providers/LanguageProvider";
import SectionHeading from "@/components/shared/SectionHeading";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Expertise() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".exp-item", {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: ".exp-grid", start: "top 85%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.about.expertise.eyebrow}
          title={t.about.expertise.title}
          description={t.about.expertise.description}
        />
        <div className="exp-grid mt-14 grid gap-px overflow-hidden rounded-lg border border-[#10243A]/10 bg-[#10243A]/10 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map(({ key, href, icon: Icon }) => (
            <Link
              key={key}
              href={href}
              className="exp-item group bg-white p-8 transition-colors hover:bg-[#10243A]"
            >
              <Icon size={30} className="text-[#C6A15B]" />
              <h3 className="mt-5 text-lg font-semibold text-[#10243A] transition-colors group-hover:text-white">
                {t.services.items[key].title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#10243A]/70 transition-colors group-hover:text-white/75">
                {t.services.items[key].description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}