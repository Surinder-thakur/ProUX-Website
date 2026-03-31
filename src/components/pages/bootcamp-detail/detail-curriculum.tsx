"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { CurriculumWeek, BootcampModule } from "@/lib/data/bootcamps";

function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 shrink-0">
      <span className="w-2 h-2 rounded-full bg-emerald-500" />
      <span className="text-[12px] font-medium text-emerald-600">Live</span>
    </span>
  );
}

export default function DetailCurriculum({
  curriculum,
  mod,
  variant = "bootcamp",
}: {
  curriculum: CurriculumWeek[];
  mod: BootcampModule;
  variant?: "bootcamp" | "workshop";
}) {
  const allPartKeys = curriculum.flatMap((week) =>
    week.parts.map((_, j) => `${week.week}-${j}`)
  );
  const [openParts, setOpenParts] = useState<string[]>([]);
  const allOpen = allPartKeys.every((k) => openParts.includes(k));

  const togglePart = (key: string) => {
    setOpenParts((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const toggleAll = () => {
    setOpenParts(allOpen ? [] : allPartKeys);
  };

  // Workshop: track which modules are expanded (first open by default)
  const allModuleKeys = curriculum.map((w) => w.week);
  const [openModules, setOpenModules] = useState<number[]>([curriculum[0]?.week ?? 1]);
  const allModulesOpen = allModuleKeys.every((k) => openModules.includes(k));

  const toggleModule = (week: number) => {
    setOpenModules((prev) =>
      prev.includes(week) ? prev.filter((k) => k !== week) : [...prev, week]
    );
  };

  const toggleAllModules = () => {
    setOpenModules(allModulesOpen ? [] : allModuleKeys);
  };

  let partNum = 0;

  return (
    <section className="py-7 md:py-10">
      <div className="mb-10 md:mb-12">
        <div className="flex items-center gap-3 mb-3">
          <p className="text-xs md:text-sm font-normal text-[hsl(var(--text-primary-600))] uppercase tracking-wider">
            Curriculum
          </p>
          {variant === "workshop" && (
            <>
              <span className="text-[hsl(var(--text-primary-600))]">&middot;</span>
              <LiveBadge />
              <span className="text-xs font-medium text-[hsl(var(--text-primary-600))]">Live Workshop</span>
            </>
          )}
        </div>
        <div className="flex items-center justify-between">
          <h2 className="text-[26px] md:text-[32px] font-extrabold tracking-[-0.6px] text-foreground">
            {variant === "workshop" ? "Workshop Agenda" : "Bootcamp Agenda"}
          </h2>
          {variant === "workshop" && (
            <button
              onClick={toggleAllModules}
              className="text-[13px] font-semibold text-primary hover:text-primary/80 transition-colors shrink-0 ml-4"
            >
              {allModulesOpen ? "Collapse All" : "Expand All"}
            </button>
          )}
        </div>
      </div>

      <div className="max-w-[800px] mx-auto">
        {/* Schedule header (bootcamp only) */}
        {variant !== "workshop" && (
        <div className="rounded-2xl bg-[hsl(var(--gold-100))] border border-[#ece7da] px-6 py-6 mb-8">
          <div className="mb-5">
            <p className="text-[11px] font-bold text-primary uppercase tracking-wider">
              Bootcamp Schedule
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            <div>
              <p className="text-[11px] text-muted-foreground mb-1">Starts</p>
              <p className="text-[18px] font-bold text-foreground tracking-tight leading-none">{mod.startDate}</p>
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground mb-1">Each class</p>
              <p className="text-[18px] font-bold text-foreground tracking-tight leading-none">90 min</p>
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground mb-1">Cohort size</p>
              <p className="text-[18px] font-bold text-foreground tracking-tight leading-none">12 max</p>
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground mb-1">Duration</p>
              <p className="text-[18px] font-bold text-foreground tracking-tight leading-none">4 weeks</p>
            </div>
          </div>
        </div>
        )}

        {/* Week-by-week heading + expand all (bootcamp only) */}
        {variant !== "workshop" && (
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[15px] font-bold text-foreground tracking-[-0.2px]">
            Weekly Breakdown
          </h3>
          <button
            onClick={toggleAll}
            className="text-[13px] font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            {allOpen ? "Collapse All" : "Expand All"}
          </button>
        </div>
        )}

        {/* Workshop: collapsible single-level cards, first open by default */}
        {variant === "workshop" ? (
          <div className="space-y-3">
            {curriculum.map((week) => {
              const isModuleOpen = openModules.includes(week.week);
              return (
                <div
                  key={week.week}
                  className={`rounded-2xl border border-[#ece7da] overflow-hidden cursor-pointer transition-colors duration-150 ${
                    isModuleOpen ? "bg-white" : "bg-[#fdfbf7] hover:bg-[#f5f2ea]"
                  }`}
                  onClick={() => toggleModule(week.week)}
                >
                  <div className="flex items-center gap-3 px-6 py-5">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[hsl(var(--gold-100))] text-[13px] font-bold text-primary shrink-0">
                      {String(week.week).padStart(2, "0")}
                    </span>
                    <h3 className="text-[16px] md:text-[17px] font-bold text-foreground tracking-[-0.2px] flex-1">
                      {week.title}
                    </h3>
                    <svg
                      className={`w-4 h-4 shrink-0 text-muted-foreground transition-transform duration-200 ${isModuleOpen ? "rotate-180" : ""}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  <AnimatePresence initial={false}>
                    {isModuleOpen && week.parts[0]?.description && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 pl-[68px]">
                          <p className="text-[14px] text-muted-foreground leading-relaxed">
                            {week.parts[0].description}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        ) : (
          /* Bootcamp: multi-part expandable accordion */
          curriculum.map((week) => (
            <div key={week.week} className="mb-10 last:mb-0">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[17px] md:text-[18px] font-bold text-foreground tracking-[-0.3px]">
                  {week.title}
                </h3>
                <div className="flex items-center gap-3 shrink-0 ml-4">
                  <LiveBadge />
                  <span className="text-[13px] font-semibold text-foreground/70">
                    Week {week.week}
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-[#ece7da] overflow-hidden divide-y divide-[#ece7da]">
                {week.parts.map((part, j) => {
                  partNum++;
                  const num = String(partNum).padStart(2, "0");
                  const partKey = `${week.week}-${j}`;
                  const isOpen = openParts.includes(partKey);

                  return (
                    <div
                      key={j}
                      className={`cursor-pointer transition-colors duration-150 ${
                        isOpen ? "bg-white" : "bg-[#fdfbf7] hover:bg-[#f9f6ef]"
                      }`}
                      onClick={() => togglePart(partKey)}
                    >
                      <div className="flex items-center gap-4 px-5 py-4">
                        <span className="text-[13px] font-medium text-muted-foreground/50 w-6 shrink-0 tabular-nums">
                          {num}
                        </span>
                        <p className="text-[14px] font-semibold text-foreground flex-1">
                          {part.title}
                        </p>
                      </div>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-4 pl-[60px]">
                              <p className="text-[13px] text-muted-foreground leading-relaxed">
                                {part.description || `Deep-dive into ${part.title.toLowerCase()}. Hands-on exercises and live demonstration with real-world examples.`}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
