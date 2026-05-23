import type { CustomerSubscription, SubscriptionStatus } from "@/lib/domain/subscription";

export function isSuspended(status: SubscriptionStatus): boolean {
  return status === "suspended";
}

export function isExpired(status: SubscriptionStatus): boolean {
  return status === "expired";
}

export function canRenewSubscription(sub: CustomerSubscription): boolean {
  return sub.status === "active";
}

export function canManageConnection(sub: CustomerSubscription): boolean {
  return sub.status === "active";
}

export function connectionDisplayStatus(sub: CustomerSubscription): {
  label: string;
  online: boolean;
} {
  if (sub.status === "suspended") {
    return { label: "Suspended", online: false };
  }
  if (sub.status === "expired") {
    return { label: "Expired", online: false };
  }
  return { label: "Online", online: true };
}
