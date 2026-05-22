import { brand } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const highlights = [
  "Speed test and connection health",
  "One-click bill pay via UPI and cards",
  "Plan renewal and upgrade controls",
] as const;

export function DashboardPreview() {
  return (
    <section className="border-t border-border bg-telecom-darker py-14 sm:py-16 lg:py-20">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <SectionHeading
              align="left"
              light
              label="Customer portal"
              title="Manage your connection online"
              description="Pay bills, track usage, renew plans, and raise service requests without visiting a store."
            />
            <ul className="mt-6 space-y-3">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-slate-300"
                >
                  <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.03]">
            <div className="border-b border-white/10 px-4 py-2.5">
              <p className="text-[11px] text-slate-500">{brand.portal}</p>
            </div>

            <div className="space-y-3 p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-slate-500">Account</p>
                  <p className="text-sm font-medium text-white">Rahul Sharma</p>
                </div>
                <span className="rounded bg-emerald-500/15 px-2 py-0.5 text-[11px] font-medium text-emerald-400">
                  Active
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="rounded-md border border-white/8 px-3 py-2.5">
                  <p className="text-[11px] text-slate-500">Current plan</p>
                  <p className="text-sm font-medium text-white">Home Plus</p>
                  <p className="text-[11px] text-slate-400">300 Mbps</p>
                </div>
                <div className="rounded-md border border-white/8 px-3 py-2.5">
                  <p className="text-[11px] text-slate-500">Bill due</p>
                  <p className="text-sm font-medium text-white">₹799</p>
                  <p className="text-[11px] text-slate-400">28 May 2026</p>
                </div>
              </div>

              <div className="rounded-md border border-white/8 px-3 py-2.5">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-500">This month</span>
                  <span className="text-slate-300">412 GB used</span>
                </div>
                <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[68%] rounded-full bg-telecom/70" />
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {["Pay bill", "Speed test", "Support"].map((action, i) => (
                  <span
                    key={action}
                    className={`rounded px-3 py-1.5 text-[11px] font-medium ${
                      i === 0
                        ? "bg-telecom text-white"
                        : "border border-white/10 text-slate-400"
                    }`}
                  >
                    {action}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
