import type { ReactNode } from "react";

type AdminFormFieldProps = {
  label: string;
  hint?: string;
  children: ReactNode;
  className?: string;
};

export function AdminFormField({
  label,
  hint,
  children,
  className = "",
}: AdminFormFieldProps) {
  return (
    <div className={className}>
      <label className="mb-1 block text-[11px] font-medium text-muted">{label}</label>
      {children}
      {hint && <p className="mt-1 text-[11px] text-muted">{hint}</p>}
    </div>
  );
}

export const adminInputClass =
  "w-full rounded border border-border px-2.5 py-2 text-[13px] outline-none focus:border-telecom focus:ring-1 focus:ring-telecom";
