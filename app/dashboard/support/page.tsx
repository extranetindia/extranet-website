import { supportTickets } from "@/lib/dashboard-data";
import { PageShell } from "@/components/dashboard/PageShell";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { SupportForm } from "@/components/dashboard/support/SupportForm";

export default function SupportPage() {
  return (
    <PageShell
      title="Support"
      description="24×7 customer care for Extranet broadband subscribers."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <DashboardCard title="Contact us">
          <div className="space-y-3 text-[13px]">
            <p>
              <span className="text-muted">Toll-free: </span>
              <a href="tel:18001234567" className="font-medium text-telecom hover:text-telecom-dark">
                1800-123-4567
              </a>
            </p>
            <p>
              <span className="text-muted">WhatsApp: </span>
              <span className="font-medium text-foreground">+91 98765 43210</span>
            </p>
            <p>
              <span className="text-muted">Email: </span>
              <span className="font-medium text-foreground">support@extranet.in</span>
            </p>
          </div>
        </DashboardCard>

        <DashboardCard title="Raise a ticket">
          <SupportForm />
        </DashboardCard>
      </div>

      <DashboardCard title="Recent tickets" className="mt-5">
        <ul className="divide-y divide-border">
          {supportTickets.map((ticket) => (
            <li
              key={ticket.id}
              className="flex flex-col gap-1 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-[13px] font-medium text-foreground">{ticket.subject}</p>
                <p className="text-[12px] text-muted">
                  {ticket.id} · {ticket.date}
                </p>
              </div>
              <span className="w-fit rounded bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                {ticket.status}
              </span>
            </li>
          ))}
        </ul>
      </DashboardCard>
    </PageShell>
  );
}
