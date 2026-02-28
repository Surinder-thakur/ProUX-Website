export function TrainingHero() {
  return (
    <section className="bg-background pt-32 pb-16 md:pb-20 overflow-hidden">
      <div className="container-default">
        <div className="mx-auto max-w-3xl text-center">
          {/* Eyebrow */}
          <p className="text-xs md:text-sm font-normal text-[hsl(var(--text-primary-600))] uppercase tracking-wider mb-6">
            For UX Designers Becoming AI Design Engineers
          </p>

          {/* Headline */}
          <h1 className="text-3xl md:text-4xl lg:text-[56px] lg:leading-[64px] font-extrabold text-foreground tracking-[-1.4px] mb-6">
            Master AI-Powered
            <br />
            <span className="text-primary">UX Design</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm md:text-base lg:text-[18px] lg:leading-[28px] font-medium text-[#4f4f4f] mx-auto max-w-2xl">
            Go from UX designer to AI design engineer. Learn to use AI across
            every stage of your design process — research, prototyping, systems, and testing.
          </p>
        </div>
      </div>
    </section>
  );
}
