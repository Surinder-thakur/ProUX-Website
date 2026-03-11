import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CourseBottomCta({
  title,
  price,
}: {
  title: string;
  price: number;
}) {
  return (
    <section className="relative overflow-hidden bg-proux-navy section-padding">
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, hsl(var(--proux-copper)) 0%, transparent 50%)",
        }}
      />

      <div className="container-narrow relative text-center">
        <h2 className="heading-2 mb-4 text-white">
          Ready to Get Started?
        </h2>
        <p className="body-large mx-auto mb-8 max-w-xl !text-white/70">
          Enroll in {title} today and start building the skills that will
          define your career.
        </p>
        <Button
          size="lg"
          className="rounded-full px-10 py-6 text-sm font-bold uppercase tracking-wider text-white"
          style={{ backgroundColor: "hsl(var(--proux-copper))" }}
        >
          Enroll for ${price}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <p className="mt-5 text-sm text-white/50">
          30-day money-back guarantee
        </p>
      </div>
    </section>
  );
}
