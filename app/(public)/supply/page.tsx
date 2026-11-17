"use client";

import PageHeader from "@/components/shared/PageHeader";
import CtaBand from "@/components/shared/CtaBand";
import CategorySection from "@/components/shared/CategorySection";
import ProcessSteps from "@/components/shared/ProcessSteps";
import { SUPPLY_CATEGORIES } from "@/data/supply";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function SupplyPage() {
  const { t } = useLanguage();

  const categories = SUPPLY_CATEGORIES.map((c) => ({
    id: c.id,
    image: c.image,
    title: t.supply.categories[c.id].title,
    description: t.supply.categories[c.id].description,
    items: t.supply.categories[c.id].items,
  }));

  return (
    <>
      <PageHeader
        eyebrow={t.supply.header.eyebrow}
        title={t.supply.header.title}
        description={t.supply.header.description}
        current={t.nav.supply}
      />
      <CategorySection categories={categories} />
      <ProcessSteps />
      <CtaBand />
    </>
  );
}