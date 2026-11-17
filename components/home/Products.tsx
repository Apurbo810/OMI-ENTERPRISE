"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PRODUCTS } from "@/data/products";
import { useLanguage } from "@/components/providers/LanguageProvider";
import SectionHeading from "@/components/shared/SectionHeading";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Products() {
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
        gsap.from(".product-card", {
          y: 40,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: ".product-grid", start: "top 85%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="products" className="scroll-mt-20 bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.products.eyebrow}
          title={t.products.title}
          description={t.products.description}
        />

        <div className="product-grid mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p) => (
            <Link
              key={p.key}
              href={p.href}
              className="product-card group block overflow-hidden rounded-lg border border-[#10243A]/10 bg-white"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#1B3655]">
                <Image
                  src={p.image}
                  alt={t.products.items[p.key].title}
                  fill
                  loading="eager"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-[#10243A]">
                  {t.products.items[p.key].title}
                </h3>
                <p className="mt-2 leading-relaxed text-[#10243A]/70">
                  {t.products.items[p.key].description}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#10243A] transition-colors group-hover:text-[#C6A15B]">
                  {t.products.viewDetails}
                  <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/supply"
            className="inline-flex min-h-12 items-center justify-center rounded-md bg-[#C6A15B] px-7 py-3 font-semibold text-[#10243A] transition-colors hover:bg-[#D9BC82]"
          >
            {t.products.viewAll}
          </Link>
        </div>
      </div>
    </section>
  );
}