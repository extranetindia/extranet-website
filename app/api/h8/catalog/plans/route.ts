import { NextResponse } from "next/server";
import { getDbPlans } from "@/lib/api/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const plans = getDbPlans();
    // Only return active plans for the public/app catalog
    const activePlans = plans.filter((p) => p.status === "active");
    return NextResponse.json(activePlans);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch plans catalog", details: error?.message },
      { status: 500 }
    );
  }
}
