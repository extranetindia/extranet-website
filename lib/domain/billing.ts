export type PaymentStatus = "Paid" | "Failed" | "Pending";

/** Historical billing / invoice record tied to a customer subscription */
export type BillingRecord = {
  id: string;
  customerId: string;
  txnId: string;
  invoiceId: string;
  date: string;
  /** Amount actually charged for this customer */
  amount: number;
  status: PaymentStatus;
  method: string;
  planName: string;
  speed: string;
  billingCycle: "monthly" | "quarterly";
};
