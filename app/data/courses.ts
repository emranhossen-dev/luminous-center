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
  /** Card image URL (placeholder; replace with your own later) */
  image: string;
}

const COURSE_IMAGES: Record<string, string> = {
  "Digital Marketing for Freelancing Level 3":
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
  "Web Design and Development for Freelancing Level 3":
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80",
  "Hand Stitch and Embroidery":
    "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&q=80",
};

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
        image: COURSE_IMAGES[title] ?? "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80",
      });
    }
  }
  return items;
}
