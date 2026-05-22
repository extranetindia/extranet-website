"use client";

import { useState } from "react";
import { wifi } from "@/lib/dashboard-data";
import { Button } from "@/components/ui/Button";

export function WifiNameForm() {
  const [ssid, setSsid] = useState<string>(wifi.ssid);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="ssid" className="block text-[13px] font-medium text-foreground">
          WiFi network name (SSID)
        </label>
        <input
          id="ssid"
          type="text"
          value={ssid}
          onChange={(e) => setSsid(e.target.value)}
          className="mt-1.5 w-full rounded-md border border-border px-3 py-2.5 text-[13px] outline-none focus:border-telecom focus:ring-1 focus:ring-telecom"
        />
        <p className="mt-1.5 text-[12px] text-muted">
          Band: {wifi.band} · Changes may take up to 2 minutes.
        </p>
      </div>
      <Button type="submit" variant="primary">
        {saved ? "Saved" : "Save network name"}
      </Button>
    </form>
  );
}
