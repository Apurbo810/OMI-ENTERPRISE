"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { GALLERY } from "@/data/gallery";
import { useLanguage } from "@/components/providers/LanguageProvider";
import SectionHeading from "@/components/shared/SectionHeading";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Gallery() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".gallery-item", {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: ".gallery-grid", start: "top 85%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  const close = useCallback(() => setActive(null), []);
  const prev = useCallback(
    () => setActive((i) => (i === null ? i : (i - 1 + GALLERY.length) % GALLERY.length)),
    []
  );
  const next = useCallback(
    () => setActive((i) => (i === null ? i : (i + 1) % GALLERY.length)),
    []
  );

  // Keyboard controls + scroll lock while the lightbox is open
  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, prev, next]);

  const current = active !== null ? GALLERY[active] : null;

  return (
    <section ref={ref} id="gallery" className="scroll-mt-20 bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.gallery.eyebrow}
          title={t.gallery.title}
          description={t.gallery.description}
        />

        <div className="gallery-grid mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {GALLERY.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`${item.type === "video" ? t.gallery.play : t.gallery.itemAlt} ${i + 1}`}
              className="gallery-item group relative aspect-square overflow-hidden rounded-lg bg-[#1B3655]"
            >
              <Image
                src={item.type === "video" ? item.poster : item.src}
                alt={`${t.gallery.itemAlt} ${i + 1}`}
                fill
                sizes="(min-width: 1024px) 33vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {item.type === "video" && (
                <span className="absolute inset-0 flex items-center justify-center bg-[#10243A]/40">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#C6A15B] text-[#10243A]">
                    <Play size={24} fill="currentColor" />
                  </span>
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/projects"
            className="inline-flex min-h-12 items-center justify-center rounded-md bg-[#C6A15B] px-7 py-3 font-semibold text-[#10243A] transition-colors hover:bg-[#D9BC82]"
          >
            {t.gallery.viewAll}
          </Link>
        </div>
      </div>

      {/* Lightbox */}
      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t.gallery.title}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[#10243A]/95 p-4"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label={t.gallery.close}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-md text-white hover:text-[#D9BC82]"
          >
            <X size={26} />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label={t.gallery.previous}
            className="absolute left-2 flex h-11 w-11 items-center justify-center rounded-md text-white hover:text-[#D9BC82] sm:left-6"
          >
            <ChevronLeft size={30} />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label={t.gallery.next}
            className="absolute right-2 flex h-11 w-11 items-center justify-center rounded-md text-white hover:text-[#D9BC82] sm:right-6"
          >
            <ChevronRight size={30} />
          </button>

          <div
            className="relative h-[75vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            {current.type === "video" && current.src ? (
              <video
                key={current.id}
                src={current.src}
                poster={current.poster}
                controls
                autoPlay
                playsInline
                className="h-full w-full object-contain"
              />
            ) : (
              <Image
                src={current.type === "video" ? current.poster : current.src}
                alt={`${t.gallery.itemAlt} ${(active ?? 0) + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}