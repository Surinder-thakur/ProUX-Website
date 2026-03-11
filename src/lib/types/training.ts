export interface SyllabusLesson {
  title: string;
  duration: string;
  type: "video" | "reading" | "exercise" | "project";
}

export interface SyllabusModule {
  title: string;
  lessons: SyllabusLesson[];
}

export type CourseSyllabus = SyllabusModule[];
