"use client";

import { SuspendedBanner } from "@/components/dashboard/SuspendedBanner";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SuspendedBanner />
      {children}
    </>
  );
}
