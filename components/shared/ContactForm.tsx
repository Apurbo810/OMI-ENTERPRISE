"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { submitInquiry, type InquiryData } from "@/lib/contact";

type Field = keyof InquiryData;
type Status = "idle" | "loading" | "success" | "error" | "notConfigured";

const FIELDS: Field[] = ["name", "phone", "email", "subject", "message"];
const EMPTY: InquiryData = { name: "", phone: "", email: "", subject: "", message: "" };

export default function ContactForm() {
  const { t } = useLanguage();
  const [values, setValues] = useState<InquiryData>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<Status>("idle");

  const validate = () => {
    const e: Partial<Record<Field, string>> = {};
    FIELDS.forEach((f) => {
      if (!values[f].trim()) e[f] = t.contact.errors.required;
    });
    if (!e.email && !/^\S+@\S+\.\S+$/.test(values.email)) {
      e.email = t.contact.errors.email;
    }
    if (!e.phone && !/^[+\d][\d\s-]{6,}$/.test(values.phone)) {
      e.phone = t.contact.errors.phone;
    }
    return e;
  };

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name as Field;
    setValues((v) => ({ ...v, [name]: e.target.value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("loading");
    try {
      await submitInquiry(values);
      setStatus("success");
      setValues(EMPTY);
    } catch (err) {
      setStatus(
        err instanceof Error && err.message === "NOT_CONFIGURED"
          ? "notConfigured"
          : "error"
      );
    }
  };

  const input =
    "w-full rounded-md border bg-white px-4 py-3 text-[#10243A] outline-none transition-colors focus:border-[#C6A15B]";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="space-y-5 rounded-lg border border-[#10243A]/10 bg-white p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {(["name", "phone", "email", "subject"] as Field[]).map((f) => (
          <div key={f} className={f === "subject" ? "sm:col-span-2" : ""}>
            <label
              htmlFor={`c-${f}`}
              className="mb-1.5 block text-sm font-medium text-[#10243A]"
            >
              {t.contact.form[f]}
            </label>
            <input
              id={`c-${f}`}
              name={f}
              type={f === "email" ? "email" : f === "phone" ? "tel" : "text"}
              value={values[f]}
              onChange={onChange}
              aria-invalid={!!errors[f]}
              aria-describedby={errors[f] ? `c-${f}-err` : undefined}
              className={`${input} ${errors[f] ? "border-red-500" : "border-[#10243A]/20"}`}
            />
            {errors[f] && (
              <p id={`c-${f}-err`} className="mt-1 text-sm text-red-600">
                {errors[f]}
              </p>
            )}
          </div>
        ))}
      </div>

      <div>
        <label
          htmlFor="c-message"
          className="mb-1.5 block text-sm font-medium text-[#10243A]"
        >
          {t.contact.form.message}
        </label>
        <textarea
          id="c-message"
          name="message"
          rows={5}
          value={values.message}
          onChange={onChange}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "c-message-err" : undefined}
          className={`${input} ${errors.message ? "border-red-500" : "border-[#10243A]/20"}`}
        />
        {errors.message && (
          <p id="c-message-err" className="mt-1 text-sm text-red-600">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-md bg-[#C6A15B] px-7 py-3 font-semibold text-[#10243A] transition-colors hover:bg-[#D9BC82] disabled:opacity-60 sm:w-auto"
      >
        {status === "loading" ? t.contact.form.sending : t.contact.form.submit}
      </button>

      <div role="status" aria-live="polite">
        {status === "success" && (
          <p className="rounded-md bg-[#F4F6F8] p-3 text-sm text-[#10243A]">
            {t.contact.feedback.success}
          </p>
        )}
        {status === "error" && (
          <p className="rounded-md bg-red-50 p-3 text-sm text-red-700">
            {t.contact.feedback.error}
          </p>
        )}
        {status === "notConfigured" && (
          <p className="rounded-md bg-[#F4F6F8] p-3 text-sm text-[#10243A]">
            {t.contact.feedback.notConfigured}
          </p>
        )}
      </div>
    </form>
  );
}