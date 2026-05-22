import Link from "next/link";
import { type ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "outline-light";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: ButtonVariant;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

const variants: Record<ButtonVariant, string> = {
  primary: "bg-telecom text-white hover:bg-telecom-dark",
  secondary: "bg-telecom-darker text-white hover:bg-telecom-dark",
  outline: "border border-border bg-white text-foreground hover:bg-surface",
  "outline-light":
    "border border-white/25 bg-transparent text-white hover:bg-white/5",
  ghost: "text-muted hover:text-foreground",
};

export function Button({
  children,
  href,
  variant = "primary",
  className = "",
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-telecom";

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
      className={`${classes} disabled:cursor-not-allowed disabled:opacity-60`}
    >
      {children}
    </button>
  );
}
