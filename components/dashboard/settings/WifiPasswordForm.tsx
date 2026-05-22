"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function WifiPasswordForm() {
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="current-pw" className="block text-[13px] font-medium text-foreground">
          Current password
        </label>
        <input
          id="current-pw"
          type="password"
          placeholder="••••••••"
          className="mt-1.5 w-full rounded-md border border-border px-3 py-2.5 text-[13px] outline-none focus:border-telecom focus:ring-1 focus:ring-telecom"
        />
      </div>
      <div>
        <label htmlFor="new-pw" className="block text-[13px] font-medium text-foreground">
          New password
        </label>
        <input
          id="new-pw"
          type="password"
          placeholder="Min. 8 characters"
          className="mt-1.5 w-full rounded-md border border-border px-3 py-2.5 text-[13px] outline-none focus:border-telecom focus:ring-1 focus:ring-telecom"
        />
      </div>
      <div>
        <label htmlFor="confirm-pw" className="block text-[13px] font-medium text-foreground">
          Confirm new password
        </label>
        <input
          id="confirm-pw"
          type="password"
          placeholder="Re-enter password"
          className="mt-1.5 w-full rounded-md border border-border px-3 py-2.5 text-[13px] outline-none focus:border-telecom focus:ring-1 focus:ring-telecom"
        />
      </div>
      <Button type="submit" variant="primary">
        {saved ? "Password updated" : "Update password"}
      </Button>
    </form>
  );
}
