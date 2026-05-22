import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function LoginSection() {
  return (
    <section id="login" className="border-t border-border bg-surface py-14 sm:py-16">
      <Container>
        <div className="mx-auto max-w-md rounded-lg border border-border bg-white px-6 py-7 text-center sm:px-8">
          <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
            Already a customer?
          </h2>
          <p className="mt-2 text-[13px] leading-relaxed text-muted">
            Sign in to pay bills, download invoices, and manage your broadband
            account.
          </p>
          <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
            <Button href="/login" variant="primary">
              Login to portal
            </Button>
            <Button href="#plans" variant="outline">
              New connection
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
