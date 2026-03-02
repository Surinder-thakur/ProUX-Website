import BootcampHero from "@/components/pages/bootcamps/bootcamp-hero";
import BootcampStatsBar from "@/components/pages/bootcamps/bootcamp-stats-bar";
import BootcampModuleCards from "@/components/pages/bootcamps/bootcamp-module-cards";
import BootcampHowItWorks from "@/components/pages/bootcamps/bootcamp-how-it-works";
import BootcampInstructor from "@/components/pages/bootcamps/bootcamp-instructor";

/**
 * Bootcamp List Page — /bootcamps
 *
 * The StatsBar is placed last so the in-flow copy is below the fold.
 * Its fixed copy sticks to the viewport bottom until the user scrolls
 * far enough to see the in-flow version — same pattern as the AI product page.
 */
export default function BootcampsPage() {
  return (
    <div className="bg-[hsl(var(--bg-primary-50))]">
      <BootcampHero />
      <BootcampModuleCards />
      <BootcampStatsBar />
      <BootcampHowItWorks />
      <BootcampInstructor />
    </div>
  );
}
