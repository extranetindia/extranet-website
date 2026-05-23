export type CustomerProfile = {
  customerId: string;
  name: string;
  accountId: string;
  phone: string;
  phoneRaw: string;
  email: string;
  address: string;
  memberSince: string;
};

export const mockCustomerProfiles: Record<string, CustomerProfile> = {
  "cust-rahul": {
    customerId: "cust-rahul",
    name: "Rahul Sharma",
    accountId: "EXT-2847193",
    phone: "+91 98765 43210",
    phoneRaw: "9876543210",
    email: "rahul.sharma@email.com",
    address: "Flat 402, Green Valley Apartments, Sector 62, Noida, UP 201301",
    memberSince: "Mar 2023",
  },
  "cust-amit": {
    customerId: "cust-amit",
    name: "Amit Verma",
    accountId: "EXT-3192048",
    phone: "+91 91234 98765",
    phoneRaw: "9123498765",
    email: "amit.verma@email.com",
    address: "12, Lake View Residency, Koramangala, Bengaluru, KA 560034",
    memberSince: "Jan 2025",
  },
  "cust-priya": {
    customerId: "cust-priya",
    name: "Priya Nair",
    accountId: "EXT-4109821",
    phone: "+91 99887 11223",
    phoneRaw: "9988711223",
    email: "priya.nair@company.in",
    address: "Unit 5B, Tech Park Tower, Hitech City, Hyderabad, TS 500081",
    memberSince: "Mar 2024",
  },
};
