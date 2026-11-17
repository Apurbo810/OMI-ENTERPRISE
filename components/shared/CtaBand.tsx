"use client";

import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function CtaBand() {
  const { t } = useLanguage();
  return (
    <section className="bg-[#1B3655] py-16 lg:py-20">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
            {t.cta.title}
          </h2>
          <p className="mt-3 text-white/80">{t.cta.description}</p>
        </div>
        <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex min-h-12 items-center justify-center rounded-md bg-[#C6A15B] px-7 py-3 font-semibold text-[#10243A] transition-colors hover:bg-[#D9BC82]"
          >
            {t.cta.contact}
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/40 px-7 py-3 font-semibold text-white transition-colors hover:border-[#D9BC82] hover:text-[#D9BC82]"
          >
            {t.nav.getQuote}
          </Link>
        </div>
      </div>
    </section>
  );
}