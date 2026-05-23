import type { CustomerSubscription } from "@/lib/domain/subscription";

export const mockSubscriptions: CustomerSubscription[] = [
  {
    customerId: "cust-rahul",
    customerName: "Rahul Sharma",
    accountId: "EXT-2847193",
    planCatalogId: "home-stream",
    planName: "Home Stream",
    speed: "100 Mbps",
    billingAmount: 499,
    billingCycle: "monthly",
    expiryDate: "28 May 2026",
    startDate: "28 Apr 2023",
    status: "active",
    customerType: "legacy",
    autoRenew: true,
    billingNote: "Legacy promotional rate · Grandfathered pricing",
  },
  {
    customerId: "cust-amit",
    customerName: "Amit Verma",
    accountId: "EXT-3192048",
    planCatalogId: "home-stream",
    planName: "Home Stream",
    speed: "100 Mbps",
    billingAmount: 799,
    billingCycle: "monthly",
    expiryDate: "15 Jun 2026",
    startDate: "15 Jan 2025",
    status: "active",
    customerType: "residential",
    autoRenew: true,
  },
  {
    customerId: "cust-priya",
    customerName: "Priya Nair",
    accountId: "EXT-4109821",
    planCatalogId: "business-pro",
    planName: "Business Pro",
    speed: "300 Mbps",
    billingAmount: 4499,
    billingCycle: "monthly",
    expiryDate: "10 Jul 2026",
    startDate: "10 Mar 2024",
    status: "active",
    customerType: "business",
    autoRenew: false,
    billingNote: "Corporate contract rate",
  },
];

export const DEFAULT_CUSTOMER_ID = "cust-rahul";

/** @deprecated Portal reads from admin CRM — seed data only */
