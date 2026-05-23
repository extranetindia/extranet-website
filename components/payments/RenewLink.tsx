"use client";

import Link from "next/link";
import { usePayment } from "@/lib/payment-context";

export function RenewLink() {
  const { canRenew } = usePayment();
  if (!canRenew) return null;
  return (
    <Link
      href="/dashboard/payments/renew"
      className="text-[12px] font-medium text-telecom hover:text-telecom-dark"
    >
      New renewal →
    </Link>
  );
}
