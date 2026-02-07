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
  /** Fee in BDT. Govt = 0 (registration only). Paid/Online = course fee. */
  fee: number;
}

const projects: ProjectType[] = ["govt", "paid", "online"];
const courseTitles = [...COURSES];

const DEFAULT_FEE_BDT = 5000;

export function getAllCourses(): CourseItem[] {
  const items: CourseItem[] = [];
  let id = 0;
  for (const project of projects) {
    for (const title of courseTitles) {
      id++;
      const fee = project === "govt" ? 0 : DEFAULT_FEE_BDT;
      items.push({
        id: String(id),
        title,
        project,
        projectLabel: PROJECT_NAMES[project],
        slug: `${project}-${title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}`,
        fee,
      });
    }
  }
  return items;
}
