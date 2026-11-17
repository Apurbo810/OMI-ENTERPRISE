"use client";

import { useRef } from "react";
import { Eye, Target } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/components/providers/LanguageProvider";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function MissionVision() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".mv-card", {
          y: 40,
          opacity: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  const cards = [
    { icon: Target, ...t.about.mission },
    { icon: Eye, ...t.about.vision },
  ];

  return (
    <section ref={ref} className="bg-[#F4F6F8] py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
        {cards.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="mv-card rounded-lg border border-[#10243A]/10 border-t-4 border-t-[#C6A15B] bg-white p-8 lg:p-10"
          >
            <span className="mb-6 flex h-14 w-14 items-center justify-center rounded-md bg-[#10243A] text-[#C6A15B]">
              <Icon size={28} />
            </span>
            <h2 className="text-2xl font-bold text-[#10243A]">{title}</h2>
            <p className="mt-4 leading-relaxed text-[#10243A]/75">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}