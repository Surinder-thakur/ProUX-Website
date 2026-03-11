import { CheckCircle2 } from "lucide-react";

export function CourseOutcomes({ outcomes }: { outcomes: string[] }) {
  return (
    <section id="outcomes" className="bg-proux-warm section-padding scroll-mt-16">
      <div className="container-default">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <p className="label-caps mb-3 text-proux-copper">Learning Outcomes</p>
            <h2 className="heading-1 text-proux-navy !text-[32px] !leading-[40px] lg:!text-[40px] lg:!leading-[48px]">
              What You&apos;ll Learn
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {outcomes.map((outcome) => (
              <div
                key={outcome}
                className="flex items-start gap-3 rounded-xl border border-border/50 bg-white p-5 transition-all duration-200 hover:shadow-sm"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-proux-copper" />
                <span className="text-sm font-medium text-foreground">
                  {outcome}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
