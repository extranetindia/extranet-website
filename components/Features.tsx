import { brand, features } from "@/lib/data";
import { FeatureIcon } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Features() {
  return (
    <section id="support" className="border-t border-border bg-white py-14 sm:py-16 lg:py-20">
      <Container>
        <SectionHeading
          label={`Why ${brand.name}`}
          title="Everything included with your connection"
          description="Standard on all active Extranet home broadband plans in covered locations."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-lg border border-border p-5"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-telecom-light text-telecom">
                <FeatureIcon type={feature.icon} className="h-5 w-5" />
              </div>
              <h3 className="mt-3.5 text-[15px] font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                {feature.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 rounded-lg border border-border bg-surface px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="text-sm font-semibold text-foreground">Need help?</p>
            <p className="mt-0.5 text-[13px] text-muted">
              Call 1800-123-4567 (toll-free) · Available 24×7
            </p>
          </div>
          <a
            href="tel:18001234567"
            className="text-[13px] font-medium text-telecom hover:text-telecom-dark"
          >
            Contact support →
          </a>
        </div>
      </Container>
    </section>
  );
}
