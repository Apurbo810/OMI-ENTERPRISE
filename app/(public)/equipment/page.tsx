"use client";

import PageHeader from "@/components/shared/PageHeader";
import CtaBand from "@/components/shared/CtaBand";
import CategorySection from "@/components/shared/CategorySection";
import ProcessSteps from "@/components/shared/ProcessSteps";
import { EQUIPMENT_CATEGORIES } from "@/data/equipment";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function EquipmentPage() {
  const { t } = useLanguage();

  const categories = EQUIPMENT_CATEGORIES.map((c) => ({
    id: c.id,
    image: c.image,
    title: t.equipment.categories[c.id].title,
    description: t.equipment.categories[c.id].description,
    items: t.equipment.categories[c.id].items,
  }));

  return (
    <>
      <PageHeader
        eyebrow={t.equipment.header.eyebrow}
        title={t.equipment.header.title}
        description={t.equipment.header.description}
        current={t.nav.equipment}
      />
      <CategorySection categories={categories} />
      <ProcessSteps />
      <CtaBand />
    </>
  );
}