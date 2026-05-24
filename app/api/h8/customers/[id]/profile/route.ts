import { NextResponse } from "next/server";
import { getDbCustomerById } from "@/lib/api/db";

export const dynamic = "force-dynamic";

function formatPhone(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(-10);
  return `+91 ${d.slice(0, 5)} ${d.slice(5)}`;
}

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

    // Format fields to match CustomerProfile expected by frontend UI
    const profile = {
      customerId: customer.customerId,
      name: customer.name,
      accountId: customer.accountId,
      phone: formatPhone(customer.phoneRaw),
      phoneRaw: customer.phoneRaw,
      email: customer.email || "",
      address: customer.address,
      memberSince: customer.createdAt,
    };

    return NextResponse.json(profile);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to retrieve profile", details: error?.message },
      { status: 500 }
    );
  }
}
