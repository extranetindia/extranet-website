import { NextResponse } from "next/server";
import { getDbCustomerById, updateDbCustomer, addDbBillingRecord, nowLabel } from "@/lib/api/db";

export const dynamic = "force-dynamic";

function extendExpiryDate(currentExpiry: string | undefined, billingCycle: string): string {
  const months_map: Record<string, number> = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
  };
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  
  let start = new Date();
  
  if (currentExpiry) {
    try {
      const parts = currentExpiry.trim().split(" ");
      if (parts.length === 3) {
        const day = parseInt(parts[0], 10);
        const month = months_map[parts[1]];
        const year = parseInt(parts[2], 10);
        
        if (!Number.isNaN(day) && month !== undefined && !Number.isNaN(year)) {
          const expiryDateObj = new Date(year, month, day);
          // If current expiry is in the future, extend from that. Otherwise, extend from today!
          if (expiryDateObj.getTime() > start.getTime()) {
            start = expiryDateObj;
          }
        }
      }
    } catch (e) {
      console.error("Failed to parse current expiry date, extending from today instead", e);
    }
  }
  
  // Extend by 30 days for monthly, or 90 days for quarterly/other
  const daysToAdd = billingCycle === "quarterly" ? 90 : 30;
  const targetDate = new Date(start.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
  
  return `${targetDate.getDate()} ${monthNames[targetDate.getMonth()]} ${targetDate.getFullYear()}`;
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json().catch(() => ({}));
    
    const customer = getDbCustomerById(id);
    if (!customer || customer.deletedAt) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    }
    
    const amount = body.amount || customer.billingAmount;
    const paymentMethod = body.paymentMethod || body.method || "UPI";
    const cycle = body.billingCycle || customer.billingCycle;
    
    // Calculate new expiry date
    const oldExpiry = customer.expiryDate;
    const newExpiry = extendExpiryDate(oldExpiry, cycle);
    const newStartDate = nowLabel();
    
    // Update customer status to active and update dates
    const updatedCustomer = updateDbCustomer(id, {
      status: "active",
      expiryDate: newExpiry,
      startDate: newStartDate,
      updatedAt: nowLabel()
    });
    
    if (!updatedCustomer) {
      return NextResponse.json({ error: "Failed to update customer subscription" }, { status: 500 });
    }
    
    // Create new transaction/invoice billing record
    const year = new Date().getFullYear();
    const uniqueNum = Math.floor(1000 + Math.random() * 9000);
    const txnId = `TXN${Date.now()}${uniqueNum}`;
    const invoiceId = `INV-${year}-${uniqueNum}`;
    
    const newRecord = {
      id: invoiceId,
      customerId: id,
      txnId,
      invoiceId,
      date: newStartDate,
      amount,
      status: "Paid" as const,
      method: paymentMethod,
      planName: customer.planName,
      speed: customer.speed,
      billingCycle: (cycle === "quarterly" ? "quarterly" : "monthly") as "monthly" | "quarterly"
    };
    
    // Append to billing history
    addDbBillingRecord(newRecord);
    
    return NextResponse.json({
      success: true,
      message: "Subscription recharged successfully",
      customer: updatedCustomer,
      billingRecord: newRecord
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to process plan recharge", details: error?.message },
      { status: 500 }
    );
  }
}
