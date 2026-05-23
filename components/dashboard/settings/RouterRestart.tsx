"use client";

import { useState } from "react";
import { wifi } from "@/lib/dashboard-data";
import { usePayment } from "@/lib/payment-context";
import { Button } from "@/components/ui/Button";

export function RouterRestart() {
  const { canManageConnection, isSuspended } = usePayment();
  const [restarting, setRestarting] = useState(false);
  const [done, setDone] = useState(false);

  const handleRestart = () => {
    setRestarting(true);
    setTimeout(() => {
      setRestarting(false);
      setDone(true);
      setTimeout(() => setDone(false), 4000);
    }, 2000);
  };

  return (
    <div className="space-y-3">
      <p className="text-[13px] text-muted">
        Model: {wifi.routerModel} · Last restart: {wifi.lastRestart}
      </p>
      <p className="text-[12px] text-muted">
        Restarting will disconnect all devices for 2–3 minutes.
      </p>
      {isSuspended && (
        <p className="rounded-md bg-red-50 px-2.5 py-2 text-[12px] text-accent">
          Router restart is disabled while your account is suspended.
        </p>
      )}
      <Button
        type="button"
        variant="outline"
        onClick={handleRestart}
        disabled={restarting || !canManageConnection}
      >
        {restarting ? "Restarting…" : done ? "Restart initiated" : "Restart router now"}
      </Button>
    </div>
  );
}
