import Link from "next/link";
import type { ReactNode } from "react";

type AdminButtonVariant = "primary" | "secondary" | "outline" | "danger" | "ghost";

type AdminButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: AdminButtonVariant;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

const variants: Record<AdminButtonVariant, string> = {
  primary: "bg-telecom text-white hover:bg-telecom-dark",
  secondary: "bg-telecom-darker text-white hover:bg-telecom-dark",
  outline: "border border-border bg-white text-foreground hover:bg-surface",
  danger: "border border-red-200 bg-red-50 text-accent hover:bg-red-100",
  ghost: "text-muted hover:bg-surface hover:text-foreground",
};

export function AdminButton({
  children,
  href,
  variant = "primary",
  className = "",
  onClick,
  type = "button",
  disabled = false,
}: AdminButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-1.5 rounded px-3 py-1.5 text-[12px] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-telecom disabled:opacity-50";
  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}
