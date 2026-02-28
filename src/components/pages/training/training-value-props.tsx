import { Lightbulb, Cpu, Award } from "lucide-react";

const VALUE_PROPS = [
  {
    icon: Lightbulb,
    title: "Hands-On Projects",
    description:
      "Every course includes real-world projects you can add to your portfolio. Learn by doing, not just watching.",
  },
  {
    icon: Cpu,
    title: "AI-Powered Curriculum",
    description:
      "Our curriculum integrates the latest AI tools and techniques used by leading design teams worldwide.",
  },
  {
    icon: Award,
    title: "Certified Instructor",
    description:
      "Learn from Surinder Thakur, an NN/g certified UX consultant who has trained 12,000+ designers globally.",
  },
];

export function TrainingValueProps() {
  return (
    <section className="section-padding bg-white">
      <div className="container-default">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="label-caps mb-3 text-proux-copper">Why ProUX Training</p>
          <h2 className="heading-1 text-proux-navy">
            Built for Real-World Impact
          </h2>
        </div>

        <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-3">
          {VALUE_PROPS.map((prop) => (
            <div
              key={prop.title}
              className="flex flex-col items-center rounded-2xl border border-border/50 bg-card p-8 text-center transition-all duration-200 hover:shadow-md"
            >
              <div
                className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl"
                style={{
                  backgroundColor: "hsl(var(--proux-copper) / 0.1)",
                }}
              >
                <prop.icon
                  className="h-6 w-6"
                  style={{ color: "hsl(var(--proux-copper))" }}
                />
              </div>
              <h3 className="heading-4 mb-2 text-proux-navy !text-[20px]">
                {prop.title}
              </h3>
              <p className="body-small">{prop.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
