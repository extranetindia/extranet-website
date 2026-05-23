type AdminBadgeVariant =
  | "active"
  | "disabled"
  | "home"
  | "business"
  | "legacy"
  | "negotiated"
  | "corporate"
  | "planned";

const styles: Record<AdminBadgeVariant, string> = {
  active: "bg-emerald-50 text-emerald-800 ring-emerald-600/20",
  disabled: "bg-slate-100 text-slate-600 ring-slate-500/15",
  home: "bg-sky-50 text-sky-800 ring-sky-600/20",
  business: "bg-indigo-50 text-indigo-800 ring-indigo-600/20",
  legacy: "bg-amber-50 text-amber-900 ring-amber-600/20",
  negotiated: "bg-violet-50 text-violet-800 ring-violet-600/20",
  corporate: "bg-teal-50 text-teal-800 ring-teal-600/20",
  planned: "bg-surface text-muted ring-border",
};

type AdminBadgeProps = {
  variant: AdminBadgeVariant;
  children: React.ReactNode;
};

export function AdminBadge({ variant, children }: AdminBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ring-1 ring-inset ${styles[variant]}`}
    >
      {children}
    </span>
  );
}
