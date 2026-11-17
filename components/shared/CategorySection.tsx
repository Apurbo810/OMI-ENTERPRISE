"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/components/providers/LanguageProvider";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export type Category = {
  id: string;
  image: string;
  title: string;
  description: string;
  items: readonly string[];
};

export default function CategorySection({ categories }: { categories: Category[] }) {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".cat-row").forEach((row) => {
          gsap.from(row.querySelectorAll(".cat-media, .cat-text"), {
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: { trigger: row, start: "top 80%", once: true },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <div ref={ref}>
      {categories.map((c, i) => {
        const reversed = i % 2 === 1;
        return (
          <section
            key={c.id}
            id={c.id}
            className={`scroll-mt-20 py-20 lg:py-28 ${reversed ? "bg-[#F4F6F8]" : "bg-white"}`}
          >
            <div className="cat-row mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
              <div className={`cat-media relative ${reversed ? "lg:order-2" : ""}`}>
                <div
                  className={`absolute -bottom-4 h-full w-full rounded-lg border-2 border-[#C6A15B] ${
                    reversed ? "-right-4" : "-left-4"
                  }`}
                />
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[#1B3655]">
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="cat-text">
                <h2 className="text-3xl font-bold leading-tight text-[#10243A] sm:text-4xl">
                  {c.title}
                </h2>
                <p className="mt-4 leading-relaxed text-[#10243A]/75">{c.description}</p>

                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {c.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[#10243A]">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#10243A] text-[#C6A15B]">
                        <Check size={14} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#C6A15B] px-7 py-3 font-semibold text-[#10243A] transition-colors hover:bg-[#D9BC82]"
                >
                  {t.nav.getQuote}
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}