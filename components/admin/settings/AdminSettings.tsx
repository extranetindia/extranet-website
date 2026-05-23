import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { AdminCard } from "@/components/admin/ui/AdminCard";

const settingsSections = [
  {
    title: "Platform",
    items: [
      { label: "Brand name", value: "Extranet" },
      { label: "Customer portal URL", value: "my.extranet.in" },
      { label: "Default locale", value: "en-IN" },
    ],
  },
  {
    title: "Integrations",
    items: [
      { label: "H8 billing API", value: "Not configured (mock)" },
      { label: "Payment gateway", value: "Demo mode" },
      { label: "SMS / OTP provider", value: "Mock" },
    ],
  },
  {
    title: "Operations",
    items: [
      { label: "GST rate", value: "18%" },
      { label: "Quarterly discount", value: "5% (2.85× monthly)" },
      { label: "Catalog sync", value: "Local storage (admin)" },
    ],
  },
] as const;

export function AdminSettings() {
  return (
    <>
      <AdminPageHeader
        title="Settings"
        description="Platform configuration for the Extranet operations console. Editable controls coming in a later phase."
      />

      <div className="space-y-4">
        {settingsSections.map((section) => (
          <AdminCard key={section.title}>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">
              {section.title}
            </p>
            <dl className="mt-3 divide-y divide-border">
              {section.items.map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col gap-0.5 py-2.5 sm:flex-row sm:justify-between"
                >
                  <dt className="text-[12px] text-muted">{item.label}</dt>
                  <dd className="text-[12px] font-medium text-foreground">{item.value}</dd>
                </div>
              ))}
            </dl>
          </AdminCard>
        ))}
      </div>
    </>
  );
}
