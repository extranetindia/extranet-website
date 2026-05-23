import type { BillingCycle } from "@/lib/domain/subscription";

export function getPeriodLabel(period: BillingCycle): string {
  return period === "monthly" ? "1 month" : "3 months";
}

export function addMonthsToDate(dateStr: string, months: number): string {
  const months_map: Record<string, number> = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
  };
  const parts = dateStr.split(" ");
  const day = parseInt(parts[0], 10);
  const month = months_map[parts[1]];
  const year = parseInt(parts[2], 10);
  const d = new Date(year, month + months, day);
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()}`;
}

export function formatToday(): string {
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const now = new Date(2026, 4, 22);
  return `${now.getDate()} ${monthNames[now.getMonth()]} ${now.getFullYear()}`;
}
