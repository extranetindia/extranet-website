import { type ReactNode } from "react";

type DashboardCardProps = {
  children: ReactNode;
  className?: string;
  title?: string;
  action?: ReactNode;
};

export function DashboardCard({
  children,
  className = "",
  title,
  action,
}: DashboardCardProps) {
  return (
    <section
      className={`rounded-lg border border-border bg-white ${className}`}
    >
      {(title || action) && (
        <div className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-5">
          {title && (
            <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          )}
          {action}
        </div>
      )}
      <div className={title || action ? "p-4 sm:p-5" : "p-4 sm:p-5"}>
        {children}
      </div>
    </section>
  );
}
