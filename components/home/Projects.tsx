"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PROJECTS, type ProjectStatus } from "@/data/projects";
import { useLanguage } from "@/components/providers/LanguageProvider";
import SectionHeading from "@/components/shared/SectionHeading";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Filter = "all" | ProjectStatus;
const FILTERS: Filter[] = ["all", "completed", "ongoing"];

export default function Projects() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<Filter>("all");

  const visible = PROJECTS.filter((p) => filter === "all" || p.status === filter);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".project-card", {
          y: 40,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: ".project-grid", start: "top 85%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [filter], revertOnUpdate: true }
  );

  return (
    <section ref={ref} id="projects" className="scroll-mt-20 bg-[#F4F6F8] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.projects.eyebrow}
          title={t.projects.title}
          description={t.projects.description}
        />

        {/* Filter tabs */}
        <div role="group" aria-label={t.projects.title} className="mt-10 flex flex-wrap justify-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`min-h-11 rounded-md px-5 text-sm font-semibold transition-colors ${
                filter === f
                  ? "bg-[#10243A] text-white"
                  : "border border-[#10243A]/20 bg-white text-[#10243A] hover:border-[#C6A15B]"
              }`}
            >
              {t.projects.filters[f]}
            </button>
          ))}
        </div>

        {visible.length === 0 ? (
          <p className="mt-14 text-center text-[#10243A]/70">{t.projects.empty}</p>
        ) : (
          <div className="project-grid mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((p) => (
              <Link
                key={p.key}
                href={p.href}
                className="project-card group block overflow-hidden rounded-lg border border-[#10243A]/10 bg-white"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#1B3655]">
                  <Image
                    src={p.image}
                    alt={t.projects.items[p.key].title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span
                    className={`absolute left-4 top-4 rounded px-3 py-1 text-xs font-semibold ${
                      p.status === "completed"
                        ? "bg-[#C6A15B] text-[#10243A]"
                        : "bg-white text-[#10243A]"
                    }`}
                  >
                    {t.projects.status[p.status]}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-[#10243A]">
                    {t.projects.items[p.key].title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-[#10243A]/70">
                    {t.projects.items[p.key].description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#10243A] transition-colors group-hover:text-[#C6A15B]">
                    {t.projects.viewProject}
                    <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/projects"
            className="inline-flex min-h-12 items-center justify-center rounded-md bg-[#C6A15B] px-7 py-3 font-semibold text-[#10243A] transition-colors hover:bg-[#D9BC82]"
          >
            {t.projects.viewAll}
          </Link>
        </div>
      </div>
    </section>
  );
}