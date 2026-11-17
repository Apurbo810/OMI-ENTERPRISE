"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/components/providers/LanguageProvider";

gsap.registerPlugin(useGSAP);

type Props = { eyebrow?: string; title: string; description?: string; current: string };

export default function PageHeader({ eyebrow, title, description, current }: Props) {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".ph-item", {
          y: 24,
          opacity: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
        });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="border-b-4 border-[#C6A15B] bg-[#10243A] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="ph-item mb-6">
          <ol className="flex items-center gap-2 text-sm text-white/70">
            <li>
              <Link href="/" className="transition-colors hover:text-[#D9BC82]">
                {t.nav.home}
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight size={14} />
            </li>
            <li aria-current="page" className="text-[#C6A15B]">
              {current}
            </li>
          </ol>
        </nav>

        {eyebrow && (
          <p className="ph-item mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#C6A15B] sm:text-sm">
            {eyebrow}
          </p>
        )}
        <h1 className="ph-item text-4xl font-bold leading-tight text-white sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="ph-item mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}