"use client";

import { useState } from "react";
import { wifi } from "@/lib/dashboard-data";
import { Button } from "@/components/ui/Button";

export function RouterRestart() {
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
      <Button
        type="button"
        variant="outline"
        onClick={handleRestart}
        disabled={restarting}
      >
        {restarting ? "Restarting…" : done ? "Restart initiated" : "Restart router now"}
      </Button>
    </div>
  );
}
