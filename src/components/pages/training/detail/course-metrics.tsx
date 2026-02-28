import { Layers, Play, PenTool, FileText } from "lucide-react";

interface CourseMetricsProps {
  modules: number;
  videoHours: number;
  exercises: number;
  resources: number;
}

const METRICS = [
  { key: "modules" as const, label: "Modules", icon: Layers },
  { key: "videoHours" as const, label: "Video Hours", icon: Play },
  { key: "exercises" as const, label: "Exercises", icon: PenTool },
  { key: "resources" as const, label: "Resources", icon: FileText },
];

export function CourseMetrics(props: CourseMetricsProps) {
  return (
    <div className="container-default relative z-10 -mt-12">
      <div className="mx-auto max-w-3xl rounded-2xl border border-border/50 bg-white p-6 shadow-lg sm:p-8">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {METRICS.map((m) => (
            <div key={m.key} className="flex flex-col items-center text-center">
              <div
                className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: "hsl(var(--proux-copper) / 0.1)",
                }}
              >
                <m.icon
                  className="h-5 w-5"
                  style={{ color: "hsl(var(--proux-copper))" }}
                />
              </div>
              <span className="text-2xl font-bold text-proux-navy">
                {props[m.key]}
              </span>
              <span className="text-xs text-muted-foreground">{m.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
