import { type ReactNode } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { brand } from "@/lib/data";

type AuthLayoutProps = {
  children: ReactNode;
  title: string;
  subtitle?: string;
};

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <header className="border-b border-border bg-white px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-md items-center justify-between">
          <Logo href="/" />
          <Link
            href="/"
            className="text-[13px] font-medium text-telecom hover:text-telecom-dark"
          >
            Back to site
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-8 sm:px-6">
        <div className="w-full max-w-md">
          <div className="mb-6 text-center">
            <p className="text-xs font-medium text-telecom">{brand.name} Customer Portal</p>
            <h1 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-2 text-[13px] text-muted">{subtitle}</p>
            )}
          </div>
          <div className="rounded-lg border border-border bg-white p-5 shadow-sm sm:p-6">
            {children}
          </div>
        </div>
      </main>

      <footer className="border-t border-border bg-white px-4 py-4 text-center text-[12px] text-muted">
        © {new Date().getFullYear()} {brand.legal}
      </footer>
    </div>
  );
}
