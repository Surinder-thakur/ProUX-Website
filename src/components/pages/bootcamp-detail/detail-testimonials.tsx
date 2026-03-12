"use client";

export default function DetailTestimonials() {
  return (
    <section className="py-14 md:py-20">
      <div className="text-center">
        {/* Quotation mark */}
        <div className="mb-6">
          <svg
            className="mx-auto w-8 h-8 text-foreground/80"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
          </svg>
        </div>

        {/* Quote */}
        <p className="text-[18px] md:text-[20px] font-semibold text-foreground leading-relaxed tracking-[-0.2px] max-w-2xl mx-auto mb-6">
          The bootcamp completely changed how I approach design systems. Every
          session was hands-on, and the feedback was incredibly specific to my
          work. I left with a portfolio piece I actually use at my job.
        </p>

        {/* Author */}
        <p className="text-[15px] font-bold text-foreground">Priya Sharma</p>
        <p className="text-[14px] text-muted-foreground mt-0.5">
          Product Designer
        </p>
      </div>
    </section>
  );
}
