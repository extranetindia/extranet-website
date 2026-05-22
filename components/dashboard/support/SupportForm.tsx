"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function SupportForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <p className="rounded-lg border border-border bg-surface px-4 py-3 text-[13px] text-foreground">
        Ticket <span className="font-medium">TKT-9102</span> created. Our team will respond within 4 hours.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="subject" className="block text-[13px] font-medium text-foreground">
          Subject
        </label>
        <input
          id="subject"
          type="text"
          placeholder="Brief description of the issue"
          className="mt-1.5 w-full rounded-md border border-border px-3 py-2.5 text-[13px] outline-none focus:border-telecom focus:ring-1 focus:ring-telecom"
          required
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-[13px] font-medium text-foreground">
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          placeholder="Describe your issue in detail"
          className="mt-1.5 w-full resize-none rounded-md border border-border px-3 py-2.5 text-[13px] outline-none focus:border-telecom focus:ring-1 focus:ring-telecom"
          required
        />
      </div>
      <Button type="submit" variant="primary">
        Submit ticket
      </Button>
    </form>
  );
}
