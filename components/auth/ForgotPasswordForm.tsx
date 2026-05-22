"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function ForgotPasswordForm() {
  const [submitted, setSubmitted] = useState(false);
  const [mobile, setMobile] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="space-y-4 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-telecom-light text-telecom">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25V6.75m9 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
        </div>
        <p className="text-sm font-medium text-foreground">Reset link sent</p>
        <p className="text-[13px] text-muted">
          If +91 {mobile} is registered, you will receive reset instructions shortly.
        </p>
        <Link href="/login" className="block text-[13px] font-medium text-telecom hover:text-telecom-dark">
          Return to login
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="reset-mobile" className="block text-[13px] font-medium text-foreground">
          Registered mobile number
        </label>
        <div className="mt-1.5 flex rounded-md border border-border focus-within:border-telecom focus-within:ring-1 focus-within:ring-telecom">
          <span className="flex items-center border-r border-border bg-surface px-3 text-[13px] text-muted">
            +91
          </span>
          <input
            id="reset-mobile"
            type="tel"
            inputMode="numeric"
            placeholder="98765 43210"
            value={mobile}
            onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
            className="w-full rounded-r-md px-3 py-2.5 text-[13px] outline-none"
            required
          />
        </div>
      </div>

      <Button type="submit" variant="primary" className="w-full">
        Send reset instructions
      </Button>

      <Link
        href="/login"
        className="block text-center text-[13px] font-medium text-telecom hover:text-telecom-dark"
      >
        ← Back to login
      </Link>
    </form>
  );
}
