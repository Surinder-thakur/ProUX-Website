"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, BookOpen, PenTool, FolderKanban } from "lucide-react";
import type { CourseSyllabus } from "@/lib/types/training";

const TYPE_ICONS = {
  video: Play,
  reading: BookOpen,
  exercise: PenTool,
  project: FolderKanban,
};

const TYPE_LABELS = {
  video: "Video",
  reading: "Reading",
  exercise: "Exercise",
  project: "Project",
};

const ICON_PATHS = {
  minus: "M4.75 9.25H15.25V10.75H4.75V9.25Z",
  plus: "M9.25 9.25V4.75H10.75V9.25H15.25V10.75H10.75V15.25H9.25V10.75H4.75V9.25H9.25Z",
};

function AccordionIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="relative shrink-0 size-5">
      <svg className="block size-full" fill="none" viewBox="0 0 20 20">
        <motion.path
          d={isOpen ? ICON_PATHS.minus : ICON_PATHS.plus}
          fill="hsl(var(--foreground))"
          initial={false}
          animate={{ d: isOpen ? ICON_PATHS.minus : ICON_PATHS.plus }}
          transition={{ duration: 0.2 }}
        />
      </svg>
    </div>
  );
}

export function CourseCurriculum({ syllabus }: { syllabus: CourseSyllabus }) {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggle = (i: number) => {
    setOpenIndices((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );
  };

  return (
    <section id="curriculum" className="section-padding bg-white scroll-mt-16">
      <div className="container-default">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <p className="label-caps mb-3 text-proux-copper">Curriculum</p>
            <h2 className="heading-1 text-proux-navy !text-[32px] !leading-[40px] lg:!text-[40px] lg:!leading-[48px]">
              Course Modules
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {syllabus.map((mod, idx) => {
              const isOpen = openIndices.includes(idx);
              return (
                <div
                  key={idx}
                  className={`w-full cursor-pointer transition-all duration-200 overflow-hidden rounded-xl ${
                    isOpen
                      ? "bg-card shadow-sm"
                      : "bg-[hsl(var(--bg-primary-100))] shadow-sm"
                  }`}
                  onClick={() => toggle(idx)}
                >
                  <div className="flex items-start gap-4 px-6 py-5">
                    <div className="flex-1">
                      <p className="text-base font-semibold text-foreground md:text-lg">
                        <span className="mr-2 text-proux-copper">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        {mod.title}
                      </p>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <ul className="mt-4 space-y-3">
                              {mod.lessons.map((lesson, li) => {
                                const Icon = TYPE_ICONS[lesson.type];
                                return (
                                  <li
                                    key={li}
                                    className="flex items-center gap-3 text-sm text-muted-foreground"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <Icon className="h-4 w-4 flex-shrink-0 text-proux-copper" />
                                    <span className="flex-1 font-medium text-foreground">
                                      {lesson.title}
                                    </span>
                                    <span className="flex-shrink-0 text-xs">
                                      {lesson.duration}
                                    </span>
                                    <span className="flex-shrink-0 rounded-full bg-[hsl(var(--bg-primary-100))] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
                                      {TYPE_LABELS[lesson.type]}
                                    </span>
                                  </li>
                                );
                              })}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="mt-1">
                      <AccordionIcon isOpen={isOpen} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
