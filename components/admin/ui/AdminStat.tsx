type AdminStatProps = {
  label: string;
  value: string | number;
  hint?: string;
};

export function AdminStat({ label, value, hint }: AdminStatProps) {
  return (
    <div className="rounded-md border border-border bg-white px-3 py-2.5 sm:px-4 sm:py-3">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">
        {label}
      </p>
      <p className="mt-1 text-xl font-semibold tabular-nums text-foreground">
        {value}
      </p>
      {hint && <p className="mt-0.5 text-[11px] text-muted">{hint}</p>}
    </div>
  );
}
