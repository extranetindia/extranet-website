import { notifications } from "@/lib/dashboard-data";
import { DashboardCard } from "@/components/dashboard/DashboardCard";

export function NotificationsSection() {
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <DashboardCard
      title="Notifications"
      action={
        unreadCount > 0 ? (
          <span className="rounded bg-accent/10 px-2 py-0.5 text-[11px] font-medium text-accent">
            {unreadCount} new
          </span>
        ) : null
      }
    >
      <ul className="divide-y divide-border">
        {notifications.map((item) => (
          <li
            key={item.id}
            className={`flex gap-3 py-3 first:pt-0 last:pb-0 ${
              item.unread ? "opacity-100" : "opacity-80"
            }`}
          >
            <span
              className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                item.unread ? "bg-telecom" : "bg-border"
              }`}
            />
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-medium text-foreground">{item.title}</p>
              <p className="mt-0.5 text-[12px] leading-relaxed text-muted">
                {item.message}
              </p>
              <p className="mt-1 text-[11px] text-muted">{item.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </DashboardCard>
  );
}
