import { type NextRequest, NextResponse } from "next/server";
import { getDbCustomers } from "@/lib/api/db";

export const dynamic = "force-dynamic";

function normalizePhone(raw: string): string {
  return raw.replace(/\D/g, "").slice(-10);
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const phoneQuery = searchParams.get("phone");

    const customers = getDbCustomers();

    if (phoneQuery) {
      const normalizedQuery = normalizePhone(phoneQuery);
      const found = customers.find(
        (c) => normalizePhone(c.phoneRaw) === normalizedQuery && !c.deletedAt
      );

      if (!found) {
        return NextResponse.json(
          { error: "Customer not found with the provided phone number" },
          { status: 404 }
        );
      }
      return NextResponse.json(found);
    }

    // Return all non-deleted customers
    const activeCustomers = customers.filter((c) => !c.deletedAt);
    return NextResponse.json(activeCustomers);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch customers", details: error?.message },
      { status: 500 }
    );
  }
}
