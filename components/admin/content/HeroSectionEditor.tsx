"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getHeroContent,
  saveHeroContent,
} from "@/lib/admin/cms/hero-service";
import type { HeroContent, HeroContentInput } from "@/lib/domain/hero-content";
import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { AdminCard } from "@/components/admin/ui/AdminCard";
import { HeroPreview } from "@/components/admin/content/HeroPreview";

const inputClass =
  "w-full rounded border border-border px-2.5 py-2 text-[13px] outline-none focus:border-telecom focus:ring-1 focus:ring-telecom";

export function HeroSectionEditor() {
  const [form, setForm] = useState<HeroContentInput | null>(null);
  const [saved, setSaved] = useState<HeroContent | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const hero = getHeroContent();
    setForm(hero);
    setSaved(hero);
  }, []);

  if (!form) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-telecom border-t-transparent" />
      </div>
    );
  }

  const handleSave = () => {
    const result = saveHeroContent(form);
    setSaved(result);
    setForm(result);
    setMessage("Hero saved — open the homepage to see live changes.");
    window.setTimeout(() => setMessage(null), 4000);
  };

  const handleReset = () => {
    const hero = getHeroContent();
    setForm(hero);
    setSaved(hero);
  };

  return (
    <>
      <AdminPageHeader
        title="Hero section editor"
        description="Edit homepage hero copy and imagery. Changes sync to the public site via localStorage."
        actions={
          <>
            <AdminButton variant="outline" href="/admin/content">
              ← Content modules
            </AdminButton>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded border border-border bg-white px-3 py-1.5 text-[12px] font-medium text-foreground hover:bg-surface"
            >
              View homepage
            </a>
          </>
        }
      />

      {message && (
        <div className="mb-4 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-[12px] text-emerald-800">
          {message}
        </div>
      )}

      <div className="grid gap-5 lg:grid-cols-2">
        <AdminCard>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">
            Edit fields
          </p>
          <div className="mt-4 space-y-3">
            <Field label="Promotional badge text">
              <input
                value={form.badgeText}
                onChange={(e) => setForm({ ...form, badgeText: e.target.value })}
                className={inputClass}
              />
            </Field>
            <Field label="Hero title">
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className={inputClass}
              />
            </Field>
            <Field label="Hero subtitle">
              <textarea
                rows={3}
                value={form.subtitle}
                onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                className={inputClass}
              />
            </Field>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Primary CTA text">
                <input
                  value={form.ctaText}
                  onChange={(e) => setForm({ ...form, ctaText: e.target.value })}
                  className={inputClass}
                />
              </Field>
              <Field label="Primary CTA link">
                <input
                  value={form.ctaHref}
                  onChange={(e) => setForm({ ...form, ctaHref: e.target.value })}
                  className={inputClass}
                />
              </Field>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Secondary CTA text">
                <input
                  value={form.secondaryCtaText}
                  onChange={(e) =>
                    setForm({ ...form, secondaryCtaText: e.target.value })
                  }
                  className={inputClass}
                />
              </Field>
              <Field label="Secondary CTA link">
                <input
                  value={form.secondaryCtaHref}
                  onChange={(e) =>
                    setForm({ ...form, secondaryCtaHref: e.target.value })
                  }
                  className={inputClass}
                />
              </Field>
            </div>
            <Field label="Background image URL">
              <input
                value={form.backgroundImageUrl}
                onChange={(e) =>
                  setForm({ ...form, backgroundImageUrl: e.target.value })
                }
                className={inputClass}
                placeholder="https://… or leave empty for solid brand background"
              />
            </Field>
            <Field label="Footnote (fallback if dynamic pricing unavailable)">
              <input
                value={form.footnote}
                onChange={(e) => setForm({ ...form, footnote: e.target.value })}
                className={inputClass}
              />
            </Field>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <AdminButton variant="primary" onClick={handleSave}>
              Save & publish
            </AdminButton>
            <AdminButton variant="outline" onClick={handleReset}>
              Reload saved
            </AdminButton>
          </div>
          {saved && (
            <p className="mt-3 text-[11px] text-muted">
              Last saved: {saved.updatedAt}
            </p>
          )}
        </AdminCard>

        <div className="space-y-3">
          <AdminCard padding="sm">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">
              Live preview
            </p>
            <p className="mt-1 text-[12px] text-muted">
              Reflects current form values (not yet saved until you click Save).
            </p>
          </AdminCard>
          <HeroPreview hero={{ ...form, updatedAt: saved?.updatedAt ?? "" }} />
        </div>
      </div>

      <p className="mt-4 text-[12px] text-muted">
        Tip: open{" "}
        <Link href="/" className="font-medium text-telecom hover:underline">
          homepage
        </Link>{" "}
        in another tab — saving here updates it instantly when you switch back.
      </p>
    </>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1 block text-[11px] font-medium text-muted">{label}</label>
      {children}
    </div>
  );
}
