import { plans } from "@/lib/data";
import { CheckIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Plans() {
  return (
    <section id="plans" className="bg-surface py-14 sm:py-16 lg:py-20">
      <Container>
        <SectionHeading
          label="Residential plans"
          title="Choose the speed that fits you"
          description="Transparent pricing with unlimited fair usage. GST extra. Installation subject to address feasibility."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-3 lg:gap-6">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`flex flex-col rounded-lg border bg-white p-5 sm:p-6 ${
                plan.popular ? "border-telecom" : "border-border"
              }`}
            >
              {plan.popular && (
                <span className="mb-3 w-fit rounded bg-telecom px-2 py-0.5 text-[11px] font-medium text-white">
                  Recommended
                </span>
              )}

              <h3 className="text-[15px] font-semibold text-foreground">
                {plan.name}
              </h3>
              <p className="mt-0.5 text-sm font-medium text-telecom">
                {plan.speed}
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-muted">
                {plan.description}
              </p>

              <div className="mt-4 flex items-baseline gap-1 border-t border-border pt-4">
                <span className="text-sm text-muted">₹</span>
                <span className="text-2xl font-semibold tracking-tight text-foreground">
                  {plan.price}
                </span>
                <span className="text-[13px] text-muted">{plan.period}</span>
              </div>

              <ul className="mt-4 flex-1 space-y-2.5">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-[13px] leading-snug text-foreground/90"
                  >
                    <CheckIcon className="mt-px h-5 w-5 shrink-0 text-telecom" />
                    <span className="flex-1">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                href="#login"
                variant={plan.popular ? "primary" : "outline"}
                className="mt-5 w-full"
              >
                Get this plan
              </Button>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
