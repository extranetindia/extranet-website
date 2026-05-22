import { customer } from "@/lib/dashboard-data";

export function AccountInfo() {
  const fields = [
    { label: "Full name", value: customer.name },
    { label: "Account ID", value: customer.accountId },
    { label: "Mobile", value: customer.phone },
    { label: "Email", value: customer.email },
    { label: "Service address", value: customer.address },
    { label: "Member since", value: customer.memberSince },
  ] as const;

  return (
    <dl className="space-y-3">
      {fields.map((field) => (
        <div key={field.label} className="border-b border-border pb-3 last:border-0 last:pb-0">
          <dt className="text-[11px] font-medium uppercase tracking-wide text-muted">
            {field.label}
          </dt>
          <dd className="mt-1 text-[13px] text-foreground">{field.value}</dd>
        </div>
      ))}
    </dl>
  );
}
