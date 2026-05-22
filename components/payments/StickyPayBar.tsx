import { type ReactNode } from "react";

type StickyPayBarProps = {
  children: ReactNode;
  label?: string;
  amount?: string;
};

export function StickyPayBar({ children, label, amount }: StickyPayBarProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-white p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] lg:static lg:z-auto lg:border-0 lg:bg-transparent lg:p-0">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {(label || amount) && (
          <div className="hidden sm:block">
            {label && <p className="text-[12px] text-muted">{label}</p>}
            {amount && (
              <p className="text-lg font-semibold text-foreground">{amount}</p>
            )}
          </div>
        )}
        <div className="w-full sm:w-auto sm:min-w-[200px]">{children}</div>
      </div>
    </div>
  );
}
