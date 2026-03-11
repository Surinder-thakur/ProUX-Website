import { CourseFilter } from "./course-filter";
import type { CourseWithSyllabus } from "@/lib/data/courses";

export function CourseGrid({ courses }: { courses: CourseWithSyllabus[] }) {
  return (
    <section id="courses" className="bg-proux-warm section-padding scroll-mt-16">
      <div className="container-default">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="label-caps mb-3 text-proux-copper">Course Catalog</p>
          <h2 className="heading-1 text-proux-navy">Choose Your Path</h2>
        </div>

        <CourseFilter courses={courses} />
      </div>
    </section>
  );
}
