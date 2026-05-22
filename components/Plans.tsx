"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlanCategoryTabs } from "@/components/plans/PlanCategoryTabs";
import { PlansCategoryPanel } from "@/components/plans/PlansCategoryPanel";
import type { PlanCategory } from "@/lib/plans-data";

export function Plans() {
  const [category, setCategory] = useState<PlanCategory>("home");

  return (
    <section id="plans" className="bg-surface py-14 sm:py-16 lg:py-20">
      <Container>
        <SectionHeading
          label="Internet plans"
          title="Plans for every need"
          description="Whether you are connecting a home or running a business, Extranet offers reliable fiber with transparent pricing."
        />

        <div className="mt-8">
          <PlanCategoryTabs active={category} onChange={setCategory} />
        </div>

        <div className="mt-10">
          <PlansCategoryPanel category={category} />
        </div>
      </Container>
    </section>
  );
}
