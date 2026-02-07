export type ProjectType = "govt" | "paid" | "online";

export const PROJECT_NAMES: Record<ProjectType, string> = {
  govt: "Govt Project",
  paid: "Paid Batch",
  online: "Online Batch",
};

export const COURSES = [
  "Digital Marketing for Freelancing Level 3",
  "Web Design and Development for Freelancing Level 3",
  "Hand Stitch and Embroidery",
] as const;

export interface CourseItem {
  id: string;
  title: string;
  project: ProjectType;
  projectLabel: string;
  slug: string;
}

const projects: ProjectType[] = ["govt", "paid", "online"];
const courseTitles = [...COURSES];

export function getAllCourses(): CourseItem[] {
  const items: CourseItem[] = [];
  let id = 0;
  for (const project of projects) {
    for (const title of courseTitles) {
      id++;
      items.push({
        id: String(id),
        title,
        project,
        projectLabel: PROJECT_NAMES[project],
        slug: `${project}-${title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}`,
      });
    }
  }
  return items;
}
