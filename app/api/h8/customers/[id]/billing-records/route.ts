import { NextResponse } from "next/server";
import { getDbBillingRecords } from "@/lib/api/db";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const records = getDbBillingRecords();
    const customerRecords = records.filter((r) => r.customerId === id);

    return NextResponse.json(customerRecords);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to retrieve billing records", details: error?.message },
      { status: 500 }
    );
  }
}
