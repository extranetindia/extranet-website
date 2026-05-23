"use client";

import { getCurrentCustomerProfile } from "@/lib/customers/customer-profile-service";

export function AccountInfo() {
  const customer = getCurrentCustomerProfile();

  const rows = [
    { label: "Full name", value: customer.name },
    { label: "Account ID", value: customer.accountId },
    { label: "Mobile", value: customer.phone },
    { label: "Email", value: customer.email },
    { label: "Service address", value: customer.address },
    { label: "Member since", value: customer.memberSince },
  ];

  return (
    <dl className="divide-y divide-border">
      {rows.map((row) => (
        <AccountRow key={row.label} label={row.label} value={row.value} />
      ))}
    </dl>
  );
}

function AccountRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 py-3 sm:grid-cols-3 sm:gap-4">
      <dt className="text-[13px] font-medium text-muted">{label}</dt>
      <dd className="text-[13px] text-foreground sm:col-span-2">{value}</dd>
    </div>
  );
}
