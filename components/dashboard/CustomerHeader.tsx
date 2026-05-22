import { customer } from "@/lib/dashboard-data";

export function CustomerHeader() {
  return (
    <header
      id="overview"
      className="scroll-mt-20 rounded-lg border border-border bg-white p-4 sm:p-5"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-telecom-light text-sm font-semibold text-telecom">
            {customer.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-foreground">
              {customer.name}
            </h1>
            <p className="text-[13px] text-muted">
              Account {customer.accountId}
            </p>
          </div>
        </div>
        <div className="text-left text-[13px] text-muted sm:text-right">
          <p>{customer.phone}</p>
          <p className="mt-0.5 truncate">{customer.email}</p>
        </div>
      </div>
      <p className="mt-3 border-t border-border pt-3 text-[12px] leading-relaxed text-muted">
        {customer.address}
      </p>
    </header>
  );
}
