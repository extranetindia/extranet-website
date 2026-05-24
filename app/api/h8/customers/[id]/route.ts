import { NextResponse } from "next/server";
import { getDbCustomerById } from "@/lib/api/db";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const customer = getDbCustomerById(id);

    if (!customer || customer.deletedAt) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    }

    return NextResponse.json(customer);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to retrieve customer details", details: error?.message },
      { status: 500 }
    );
  }
}
