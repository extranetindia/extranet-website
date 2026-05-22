import { customer } from "@/lib/dashboard-data";

export function CustomerHeader() {
  const initials = customer.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <header className="rounded-lg border border-border bg-white p-4 sm:p-5">
      <p className="text-[12px] font-medium text-telecom">Welcome back</p>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-telecom-light text-sm font-semibold text-telecom">
            {initials}
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-foreground">
              {customer.name}
            </h1>
            <p className="text-[13px] text-muted">Account {customer.accountId}</p>
          </div>
        </div>
        <p className="text-[12px] text-muted sm:text-right">{customer.address}</p>
      </div>
    </header>
  );
}
