import { getLoggedInCustomerId } from "@/lib/session/customer-session";
import { DEFAULT_CUSTOMER_ID } from "@/lib/subscriptions/mock-data";
import {
  mockCustomerProfiles,
  type CustomerProfile,
} from "@/lib/customers/mock-profiles";

export type { CustomerProfile };

export function getCustomerProfileById(customerId: string): CustomerProfile {
  return (
    mockCustomerProfiles[customerId] ??
    mockCustomerProfiles[DEFAULT_CUSTOMER_ID]
  );
}

export function getCurrentCustomerProfile(): CustomerProfile {
  const id = getLoggedInCustomerId() ?? DEFAULT_CUSTOMER_ID;
  return getCustomerProfileById(id);
}
