import * as fs from "fs";
import * as path from "path";
import { seedAdminCatalog } from "@/lib/admin/seed/catalog-seed";
import { seedAdminCustomers } from "@/lib/admin/seed/customers-seed";
import { seedPricingOverrides } from "@/lib/admin/seed/pricing-overrides-seed";
import { mockBillingRecords } from "@/lib/billing/mock-data";
import type { AdminCustomerAccount } from "@/lib/domain/admin-customer";
import type { AdminCatalogPlan } from "@/lib/domain/admin-catalog";
import type { CustomerPricingOverride } from "@/lib/domain/pricing-override";
import type { BillingRecord } from "@/lib/domain/billing";

// Structure of the server-side JSON database
export interface ServerDatabaseSchema {
  customers: AdminCustomerAccount[];
  plans: AdminCatalogPlan[];
  billing: BillingRecord[];
  pricingOverrides: CustomerPricingOverride[];
}

const DB_FILE_PATH = path.join(process.cwd(), "lib", "api", "db.json");

// Direct access lock to prevent concurrency issues
let dbInstance: ServerDatabaseSchema | null = null;

// Initialize and seed database if necessary
export function initDb(): ServerDatabaseSchema {
  if (dbInstance) return dbInstance;

  try {
    const dir = path.dirname(DB_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    if (fs.existsSync(DB_FILE_PATH)) {
      const raw = fs.readFileSync(DB_FILE_PATH, "utf8");
      dbInstance = JSON.parse(raw) as ServerDatabaseSchema;
      return dbInstance;
    }
  } catch (error) {
    console.error("Failed to read server database, starting with seeds", error);
  }

  // Seed database
  const schema: ServerDatabaseSchema = {
    customers: seedAdminCustomers(),
    plans: seedAdminCatalog(),
    billing: mockBillingRecords,
    pricingOverrides: seedPricingOverrides(),
  };

  try {
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(schema, null, 2), "utf8");
  } catch (error) {
    console.error("Failed to write initial seeded database file", error);
  }

  dbInstance = schema;
  return dbInstance;
}

// Save database schema to JSON file
export function saveDb(schema: ServerDatabaseSchema): void {
  dbInstance = schema;
  try {
    const dir = path.dirname(DB_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(schema, null, 2), "utf8");
  } catch (error) {
    console.error("Failed to save server database file", error);
  }
}

// GET all customers
export function getDbCustomers(): AdminCustomerAccount[] {
  const db = initDb();
  return db.customers || [];
}

// SAVE all customers
export function saveDbCustomers(customers: AdminCustomerAccount[]): void {
  const db = initDb();
  db.customers = customers;
  saveDb(db);
}

// GET customer by ID
export function getDbCustomerById(customerId: string): AdminCustomerAccount | undefined {
  return getDbCustomers().find((c) => c.customerId === customerId);
}

// UPDATE customer
export function updateDbCustomer(
  customerId: string,
  updatedFields: Partial<AdminCustomerAccount>
): AdminCustomerAccount | undefined {
  const customers = getDbCustomers();
  let updatedCustomer: AdminCustomerAccount | undefined;

  const newCustomers = customers.map((c) => {
    if (c.customerId === customerId) {
      updatedCustomer = { ...c, ...updatedFields, updatedAt: nowLabel() };
      return updatedCustomer;
    }
    return c;
  });

  if (updatedCustomer) {
    saveDbCustomers(newCustomers);
  }
  return updatedCustomer;
}

// GET all plans
export function getDbPlans(): AdminCatalogPlan[] {
  const db = initDb();
  return db.plans || [];
}

// SAVE all plans
export function saveDbPlans(plans: AdminCatalogPlan[]): void {
  const db = initDb();
  db.plans = plans;
  saveDb(db);
}

// GET all billing records
export function getDbBillingRecords(): BillingRecord[] {
  const db = initDb();
  return db.billing || [];
}

// SAVE all billing records
export function saveDbBillingRecords(records: BillingRecord[]): void {
  const db = initDb();
  db.billing = records;
  saveDb(db);
}

// ADD single billing record
export function addDbBillingRecord(record: BillingRecord): void {
  const records = getDbBillingRecords();
  records.unshift(record); // Prepend new records to show at the top of history logs
  saveDbBillingRecords(records);
}

// Helper to get formatted date string: "24 May 2026"
export function nowLabel(): string {
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const d = new Date();
  return `${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()}`;
}
