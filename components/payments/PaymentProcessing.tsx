"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePayment } from "@/lib/payment-context";
import {
  clearProcessingSession,
  loadProcessingSession,
  savePaymentResult,
  shouldSimulateFail,
  type ProcessingCheckout,
} from "@/lib/payment-session";
import { getPlanById, getPlanPrice } from "@/lib/renewal-plans";

const STEPS = [
  "Verifying payment details",
  "Connecting to payment gateway",
  "Confirming transaction",
  "Activating your connection",
] as const;

const STEP_INTERVAL_MS = 900;
const FINAL_PAUSE_MS = 500;
const REDIRECT_DELAY_MS = 600;
const SAFETY_REDIRECT_MS = 8000;

type ProcessingStatus = "loading" | "steps" | "completing" | "redirecting";

export function PaymentProcessing() {
  const router = useRouter();
  const { checkout, setCheckout, completePayment } = usePayment();

  const [status, setStatus] = useState<ProcessingStatus>("loading");
  const [step, setStep] = useState(0);
  const [sessionDraft, setSessionDraft] = useState<ProcessingCheckout | null>(null);
  const [error, setError] = useState(false);

  const pipelineStarted = useRef(false);
  const redirected = useRef(false);

  const activeDraft = checkout ?? sessionDraft;
  const plan = activeDraft ? getPlanById(activeDraft.planId) : undefined;
  const amount = plan && activeDraft ? getPlanPrice(plan, activeDraft.billingPeriod) : 0;

  const redirectToResult = (simulateFail: boolean) => {
    if (redirected.current) return;
    redirected.current = true;

    const path = simulateFail
      ? "/dashboard/payments/failed"
      : "/dashboard/payments/success";

    router.replace(path);

    window.setTimeout(() => {
      if (window.location.pathname.includes("/processing")) {
        window.location.assign(path);
      }
    }, 1200);
  };

  const finalizePayment = (simulateFail: boolean) => {
    if (!sessionDraft) return;

    const planData = getPlanById(sessionDraft.planId);
    if (!planData) return;

    const method =
      sessionDraft.methodId === "upi"
        ? "UPI"
        : sessionDraft.methodId === "card"
          ? "Credit card"
          : "Net banking";

    const outcome = completePayment(!simulateFail);

    if (!simulateFail && outcome) {
      savePaymentResult({
        success: true,
        txnId: outcome.txnId,
        invoiceId: outcome.invoiceId,
        amount: outcome.amount,
        planName: outcome.planName,
        speed: outcome.speed,
        billingPeriod: sessionDraft.billingPeriod,
        newExpiryDate: outcome.newExpiry,
        method,
      });
    }

    clearProcessingSession();
    setStatus("redirecting");
    redirectToResult(simulateFail);
  };

  useEffect(() => {
    const saved = loadProcessingSession();
    const draft = checkout ?? saved;

    if (!draft) {
      setError(true);
      return;
    }

    if (!checkout) {
      setCheckout(draft);
    }
    setSessionDraft(draft);
    setStatus("steps");
    setStep(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!sessionDraft || pipelineStarted.current) return;
    pipelineStarted.current = true;

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const schedule = (fn: () => void, ms: number) => {
      const id = setTimeout(() => {
        if (!cancelled) fn();
      }, ms);
      timers.push(id);
    };

    STEPS.forEach((_, index) => {
      if (index === 0) return;
      schedule(() => setStep(index), STEP_INTERVAL_MS * index);
    });

    const finishDelay = STEP_INTERVAL_MS * (STEPS.length - 1) + FINAL_PAUSE_MS;

    schedule(() => {
      setStep(STEPS.length - 1);
      setStatus("completing");
    }, finishDelay);

    schedule(() => {
      finalizePayment(shouldSimulateFail());
    }, finishDelay + REDIRECT_DELAY_MS);

    schedule(() => {
      if (!redirected.current) {
        finalizePayment(shouldSimulateFail());
      }
    }, SAFETY_REDIRECT_MS);

    return () => {
      cancelled = true;
      timers.forEach((id) => clearTimeout(id));
    };
    // Only start pipeline once when sessionDraft is ready — never re-run on status changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionDraft]);

  if (error && !activeDraft) {
    return (
      <div className="mx-auto max-w-md py-12 text-center">
        <p className="text-[13px] text-muted">Payment session expired or not found.</p>
        <Link
          href="/dashboard/payments/renew"
          className="mt-4 inline-flex rounded-md bg-telecom px-5 py-2.5 text-sm font-medium text-white hover:bg-telecom-dark"
        >
          Start renewal again
        </Link>
      </div>
    );
  }

  if (status === "loading" || !activeDraft) {
    return (
      <div className="mx-auto max-w-md py-12 text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-telecom border-t-transparent" />
        <p className="mt-4 text-[13px] text-muted">Preparing secure payment…</p>
      </div>
    );
  }

  const isFinishing = status === "completing" || status === "redirecting";
  const simulateFail = shouldSimulateFail();
  const successPath = "/dashboard/payments/success";
  const failPath = "/dashboard/payments/failed";

  return (
    <div className="mx-auto max-w-md py-12 text-center">
      <div className="relative mx-auto h-20 w-20">
        {!isFinishing && (
          <div className="absolute inset-0 animate-ping rounded-full bg-telecom/20" />
        )}
        <div
          className={`relative flex h-20 w-20 items-center justify-center rounded-full border-2 bg-telecom-light transition-colors duration-300 ${
            isFinishing ? "border-emerald-500 bg-emerald-50" : "border-telecom"
          }`}
        >
          {isFinishing ? (
            <svg
              className="h-8 w-8 text-emerald-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
              aria-hidden
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          ) : (
            <svg
              className="h-8 w-8 animate-spin text-telecom"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          )}
        </div>
      </div>

      <h1 className="mt-6 text-lg font-semibold text-foreground">
        {status === "redirecting"
          ? "Taking you to confirmation…"
          : isFinishing
            ? "Payment confirmed"
            : "Processing payment"}
      </h1>
      {plan && (
        <p className="mt-1 text-[13px] text-muted">
          {plan.name} · ₹{amount.toLocaleString("en-IN")}
        </p>
      )}

      <ul className="mt-8 space-y-2 text-left">
        {STEPS.map((label, i) => {
          const done = i < step || isFinishing;
          const active = i === step && !isFinishing;
          return (
            <li
              key={label}
              className={`flex items-center gap-2 text-[13px] ${
                done || active ? "text-foreground" : "text-muted"
              }`}
            >
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] ${
                  done
                    ? "bg-emerald-500 text-white"
                    : active
                      ? "border-2 border-telecom text-telecom"
                      : "border border-border"
                }`}
              >
                {done ? "✓" : i + 1}
              </span>
              {label}
            </li>
          );
        })}
      </ul>

      {status === "redirecting" ? (
        <div className="mt-8">
          <p className="text-[12px] text-muted">Redirecting now…</p>
          <Link
            href={simulateFail ? failPath : successPath}
            className="mt-3 inline-block text-[13px] font-medium text-telecom hover:text-telecom-dark"
          >
            Continue to confirmation →
          </Link>
        </div>
      ) : (
        <p className="mt-8 text-[12px] text-muted">Please do not close this window.</p>
      )}
    </div>
  );
}
