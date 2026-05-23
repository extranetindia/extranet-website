import type { ReactNode } from "react";

type AdminCardProps = {
  children: ReactNode;
  className?: string;
  padding?: "sm" | "md" | "none";
};

export function AdminCard({
  children,
  className = "",
  padding = "md",
}: AdminCardProps) {
  const pad = padding === "none" ? "" : padding === "sm" ? "p-3" : "p-4 sm:p-5";
  return (
    <div
      className={`rounded-md border border-border bg-white ${pad} ${className}`}
    >
      {children}
    </div>
  );
}
