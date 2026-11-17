"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SERVICES } from "@/data/services";
import { useLanguage } from "@/components/providers/LanguageProvider";
import SectionHeading from "@/components/shared/SectionHeading";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Services() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".section-heading", {
          y: 24,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
        });
        gsap.from(".service-card", {
          y: 40,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: ".service-grid", start: "top 85%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      id="services"
      className="scroll-mt-20 bg-[#F4F6F8] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.services.eyebrow}
          title={t.services.title}
          description={t.services.description}
        />

        <div className="service-grid mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map(({ key, href, icon: Icon }) => (
            <Link
              key={key}
              href={href}
              className="service-card group flex flex-col rounded-lg border border-[#10243A]/10 bg-white p-8 transition-colors hover:border-[#C6A15B]"
            >
              <span className="mb-6 flex h-14 w-14 items-center justify-center rounded-md bg-[#10243A] text-[#C6A15B]">
                <Icon size={28} />
              </span>
              <h3 className="text-xl font-semibold text-[#10243A]">
                {t.services.items[key].title}
              </h3>
              <p className="mt-3 flex-1 leading-relaxed text-[#10243A]/70">
                {t.services.items[key].description}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#10243A] transition-colors group-hover:text-[#C6A15B]">
                {t.services.learnMore}
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}