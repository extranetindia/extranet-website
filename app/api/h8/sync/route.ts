import { NextResponse } from "next/server";
import { initDb, saveDb } from "@/lib/api/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = initDb();
    return NextResponse.json(db);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to read database state", details: error?.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const db = initDb();

    let updated = false;

    // Overwrite plans if provided
    if (body.plans && Array.isArray(body.plans)) {
      db.plans = body.plans;
      updated = true;
    }

    // Overwrite customers if provided
    if (body.customers && Array.isArray(body.customers)) {
      db.customers = body.customers;
      updated = true;
    }

    // Merge or overwrite billing records. We prefer merging to prevent losing mobile app transactions!
    if (body.billing && Array.isArray(body.billing)) {
      const serverRecordsMap = new Map(db.billing.map((r) => [r.id, r]));
      
      body.billing.forEach((record: any) => {
        // If not already in server DB, add it
        if (!serverRecordsMap.has(record.id)) {
          db.billing.unshift(record);
        } else {
          // Update existing
          const index = db.billing.findIndex((r) => r.id === record.id);
          if (index !== -1) {
            db.billing[index] = { ...db.billing[index], ...record };
          }
        }
      });
      updated = true;
    }

    // Overwrite pricing overrides if provided
    if (body.pricingOverrides && Array.isArray(body.pricingOverrides)) {
      db.pricingOverrides = body.pricingOverrides;
      updated = true;
    }

    if (updated) {
      saveDb(db);
    }

    return NextResponse.json({
      success: true,
      message: "Database synchronized successfully",
      db,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to synchronize database state", details: error?.message },
      { status: 500 }
    );
  }
}
