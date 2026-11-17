"use client";

import { useRef } from "react";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CONTACT } from "@/data/contact";
import { useLanguage } from "@/components/providers/LanguageProvider";
import SectionHeading from "@/components/shared/SectionHeading";
import ContactForm from "@/components/shared/ContactForm";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Contact() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".contact-col", {
          y: 40,
          opacity: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: { trigger: ".contact-grid", start: "top 85%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  const rows = [
    CONTACT.phone && {
      icon: Phone,
      label: t.contact.phone,
      value: CONTACT.phone,
      href: `tel:${CONTACT.phone}`,
    },
    CONTACT.whatsapp && {
      icon: MessageCircle,
      label: t.contact.whatsapp,
      value: t.contact.chatOnWhatsApp,
      href: `https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}`,
    },
    CONTACT.email && {
      icon: Mail,
      label: t.contact.email,
      value: CONTACT.email,
      href: `mailto:${CONTACT.email}`,
    },
    CONTACT.address && {
      icon: MapPin,
      label: t.contact.address,
      value: CONTACT.address,
      href: undefined,
    },
  ].filter(Boolean) as {
    icon: typeof Phone;
    label: string;
    value: string;
    href?: string;
  }[];

  return (
    <section
      ref={ref}
      id="contact"
      className="scroll-mt-20 bg-[#F4F6F8] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.contact.eyebrow}
          title={t.contact.title}
          description={t.contact.description}
        />

        <div className="contact-grid mt-14 grid gap-8 lg:grid-cols-5">
          <div className="contact-col space-y-4 lg:col-span-2">
            {rows.length === 0 ? (
              <p className="text-[#10243A]/70">{t.contact.notAdded}</p>
            ) : (
              rows.map(({ icon: Icon, label, value, href }) => {
                const inner = (
                  <>
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-[#10243A] text-[#C6A15B]">
                      <Icon size={22} />
                    </span>
                    <span>
                      <span className="block text-xs uppercase tracking-widest text-[#C6A15B]">
                        {label}
                      </span>
                      <span className="block break-words text-[#10243A]">
                        {value}
                      </span>
                    </span>
                  </>
                );

                return href ? (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-4 rounded-lg border border-[#10243A]/10 bg-white p-4 transition-colors hover:border-[#C6A15B]"
                  >
                    {inner}
                  </a>
                ) : (
                  <div
                    key={label}
                    className="flex items-center gap-4 rounded-lg border border-[#10243A]/10 bg-white p-4"
                  >
                    {inner}
                  </div>
                );
              })
            )}
          </div>

          <div className="contact-col lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}