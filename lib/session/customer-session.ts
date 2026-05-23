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

/** Demo: map mobile suffix to customer — replace with H8 auth later */
export function resolveCustomerIdFromPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.endsWith("43210")) return "cust-rahul";
  if (digits.endsWith("98765")) return "cust-amit";
  return "cust-rahul";
}
