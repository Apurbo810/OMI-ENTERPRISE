type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
}: Props) {
  return (
    <div
      className={`section-heading max-w-2xl ${
        align === "center" ? "mx-auto text-center" : ""
      }`}
    >
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#C6A15B] sm:text-sm">
          {eyebrow}
        </p>
      )}
      <h2
        className={`text-3xl font-bold leading-tight sm:text-4xl ${
          light ? "text-white" : "text-[#10243A]"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            light ? "text-white/80" : "text-[#10243A]/70"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}