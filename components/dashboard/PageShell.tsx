import { type ReactNode } from "react";

type PageShellProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function PageShell({ title, description, children }: PageShellProps) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6 sm:py-6 lg:py-8">
      <header className="mb-5">
        <h1 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-1 text-[13px] text-muted">{description}</p>
        ) : null}
      </header>
      {children}
    </div>
  );
}
