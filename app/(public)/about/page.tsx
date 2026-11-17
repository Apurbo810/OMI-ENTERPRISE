"use client";

import PageHeader from "@/components/shared/PageHeader";
import CtaBand from "@/components/shared/CtaBand";
import AboutIntro from "@/components/about/AboutIntro";
import MissionVision from "@/components/about/MissionVision";
import Expertise from "@/components/about/Expertise";
import Values from "@/components/about/Values";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function AboutPage() {
  const { t } = useLanguage();
  return (
    <>
      <PageHeader
        eyebrow={t.about.header.eyebrow}
        title={t.about.header.title}
        description={t.about.header.description}
        current={t.nav.about}
      />
      <AboutIntro />
      <MissionVision />
      <Expertise />
      <Values />
      <CtaBand />
    </>
  );
}