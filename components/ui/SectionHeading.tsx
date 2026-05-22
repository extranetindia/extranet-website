type SectionHeadingProps = {
  label?: string;
  title: string;
  description?: string;
  light?: boolean;
  align?: "left" | "center";
};

export function SectionHeading({
  label,
  title,
  description,
  light = false,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : "text-left"}`}
    >
      {label && (
        <p
          className={`text-xs font-medium ${light ? "text-slate-400" : "text-telecom"}`}
        >
          {label}
        </p>
      )}
      <h2
        className={`${label ? "mt-2" : ""} text-xl font-semibold tracking-tight sm:text-2xl ${
          light ? "text-white" : "text-foreground"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-3 text-sm leading-relaxed sm:text-[15px] ${
            light ? "text-slate-400" : "text-muted"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
