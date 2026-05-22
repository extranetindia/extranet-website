"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export function LoginForm() {
  const router = useRouter();
  const [step, setStep] = useState<"mobile" | "otp">("mobile");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobile.length >= 10) setStep("otp");
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  if (step === "mobile") {
    return (
      <form onSubmit={handleSendOtp} className="space-y-4">
        <div>
          <label htmlFor="mobile" className="block text-[13px] font-medium text-foreground">
            Registered mobile number
          </label>
          <div className="mt-1.5 flex rounded-md border border-border focus-within:border-telecom focus-within:ring-1 focus-within:ring-telecom">
            <span className="flex items-center border-r border-border bg-surface px-3 text-[13px] text-muted">
              +91
            </span>
            <input
              id="mobile"
              type="tel"
              inputMode="numeric"
              placeholder="98765 43210"
              value={mobile}
              onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
              className="w-full rounded-r-md px-3 py-2.5 text-[13px] outline-none"
              required
            />
          </div>
          <p className="mt-1.5 text-[12px] text-muted">
            We will send a one-time password to verify your account.
          </p>
        </div>

        <Button type="submit" variant="primary" className="w-full">
          Send OTP
        </Button>

        <p className="text-center text-[13px] text-muted">
          <Link href="/forgot-password" className="font-medium text-telecom hover:text-telecom-dark">
            Forgot password?
          </Link>
        </p>
      </form>
    );
  }

  return (
    <form onSubmit={handleVerify} className="space-y-4">
      <p className="text-[13px] text-muted">
        OTP sent to <span className="font-medium text-foreground">+91 {mobile}</span>
        {" · "}
        <button
          type="button"
          onClick={() => setStep("mobile")}
          className="font-medium text-telecom hover:text-telecom-dark"
        >
          Change
        </button>
      </p>

      <div>
        <label className="block text-[13px] font-medium text-foreground">
          Enter 6-digit OTP
        </label>
        <div className="mt-2 flex justify-between gap-2">
          {otp.map((digit, i) => (
            <input
              key={i}
              id={`otp-${i}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(i, e.target.value)}
              className="h-11 w-11 rounded-md border border-border text-center text-base font-semibold outline-none focus:border-telecom focus:ring-1 focus:ring-telecom"
            />
          ))}
        </div>
        <p className="mt-2 text-[12px] text-muted">
          Demo OTP: use any 6 digits · Resend in 0:30
        </p>
      </div>

      <Button type="submit" variant="primary" className="w-full">
        Verify & sign in
      </Button>

      <button
        type="button"
        onClick={() => setStep("mobile")}
        className="w-full text-center text-[13px] font-medium text-muted hover:text-foreground"
      >
        ← Back
      </button>
    </form>
  );
}
