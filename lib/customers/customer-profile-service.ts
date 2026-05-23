import {
  accountToCustomerProfile,
  getAdminCustomerById,
} from "@/lib/admin/services/customer-admin-service";
import { seedAdminCustomers } from "@/lib/admin/seed/customers-seed";
import { accountToProfileFields } from "@/lib/admin/seed/customers-seed";
import { PORTAL_DEFAULT_CUSTOMER_ID } from "@/lib/portal/constants";
import { getLoggedInCustomerId } from "@/lib/session/customer-session";
import type { CustomerProfile } from "@/lib/customers/mock-profiles";

export type { CustomerProfile };

export function getCustomerProfileById(customerId: string): CustomerProfile {
  const account = getAdminCustomerById(customerId);
  if (account && !account.deletedAt) {
    return accountToCustomerProfile(account);
  }

  const seeded = seedAdminCustomers().find((c) => c.customerId === customerId);
  if (seeded) return accountToProfileFields(seeded);

  const fallback = seedAdminCustomers().find(
    (c) => c.customerId === PORTAL_DEFAULT_CUSTOMER_ID
  );
  return accountToProfileFields(fallback ?? seedAdminCustomers()[0]);
}

export function getCurrentCustomerProfile(): CustomerProfile {
  const id = getLoggedInCustomerId() ?? PORTAL_DEFAULT_CUSTOMER_ID;
  return getCustomerProfileById(id);
}
