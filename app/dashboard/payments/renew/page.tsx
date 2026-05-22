import { PageShell } from "@/components/dashboard/PageShell";
import { RenewForm } from "@/components/dashboard/payments/RenewForm";

export default function RenewPage() {
  return (
    <PageShell
      title="Renew plan"
      description="Complete payment to extend your Extranet broadband subscription."
    >
      <div className="mx-auto max-w-md">
        <RenewForm />
      </div>
    </PageShell>
  );
}
