import { CourseCard } from "../course-card";
import type { CourseWithSyllabus } from "@/lib/data/courses";

export function RelatedCourses({
  courses,
}: {
  courses: CourseWithSyllabus[];
}) {
  if (courses.length === 0) return null;

  return (
    <section className="section-padding bg-white">
      <div className="container-default">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="label-caps mb-3 text-proux-copper">Keep Learning</p>
          <h2 className="heading-1 text-proux-navy !text-[32px] !leading-[40px]">
            Related Courses
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
