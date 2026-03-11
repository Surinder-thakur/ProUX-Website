import { TrainingHero } from "@/components/pages/training/training-hero";
import { BootcampSection } from "@/components/pages/training/bootcamp-section";
import { RecordedSection } from "@/components/pages/training/recorded-section";
import { bootcamps, recordedCourses } from "@/lib/data/courses";

export default function TrainingPage() {
  return (
    <>
      <TrainingHero />
      <BootcampSection courses={bootcamps} />
      <RecordedSection courses={recordedCourses} />
    </>
  );
}
