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

    const subscription = {
      customerId: customer.customerId,
      customerName: customer.name,
      accountId: customer.accountId,
      planCatalogId: customer.planCatalogId,
      planName: customer.planName,
      speed: customer.speed,
      billingAmount: customer.billingAmount,
      billingCycle: customer.billingCycle,
      expiryDate: customer.expiryDate,
      startDate: customer.startDate,
      status: customer.status,
      customerType: customer.customerType,
      autoRenew: customer.autoRenew,
      billingNote: customer.billingNote,
    };

    return NextResponse.json(subscription);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to retrieve subscription", details: error?.message },
      { status: 500 }
    );
  }
}
