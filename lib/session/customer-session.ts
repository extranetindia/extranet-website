import { findCustomerByPhone } from "@/lib/admin/services/customer-admin-service";
import { PORTAL_DEFAULT_CUSTOMER_ID } from "@/lib/portal/constants";

const CUSTOMER_ID_KEY = "extranet-customer-id";

export function setLoggedInCustomerId(customerId: string): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(CUSTOMER_ID_KEY, customerId);
}

export function getLoggedInCustomerId(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(CUSTOMER_ID_KEY);
}

export function clearLoggedInCustomerId(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(CUSTOMER_ID_KEY);
}

/** Resolve customer from admin CRM by mobile */
export function resolveCustomerIdFromPhone(phone: string): string {
  const found = findCustomerByPhone(phone);
  if (found && !found.deletedAt) {
    return found.customerId;
  }
  return PORTAL_DEFAULT_CUSTOMER_ID;
}
