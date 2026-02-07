/**
 * Class content: milestones, modules (videos), and assignments per course.
 * Web Design & Development: 10 milestones, 5 modules + 1 assignment per milestone = 50 modules, 10 assignments.
 * Roadmap: HTML → CSS → Bootstrap → Basic JavaScript (including time/date).
 */

const DUMMY_VIDEO = "https://www.w3schools.com/html/mov_bbb.mp4";

export interface ModuleItem {
  id: string;
  order: number; // global 1–50
  title: string;
  videoUrl: string;
  duration?: string;
}

export interface HomeworkTask {
  id: string;
  milestoneId: string;
  title: string;
  description: string;
  documentation?: string;
}

export interface MilestoneItem {
  id: string;
  order: number;
  title: string;
  modules: ModuleItem[];
  assignment: HomeworkTask;
}

const COURSE_TITLE_WEB_DESIGN = "Web Design and Development for Freelancing Level 3";

function buildWebDesignMilestones(): MilestoneItem[] {
  const milestones: MilestoneItem[] = [];
  let globalOrder = 0;

  const data: { title: string; modules: string[]; assignmentTitle: string; assignmentDesc: string; assignmentDoc?: string }[] = [
    {
      title: "Milestone 1: HTML Foundations",
      modules: [
        "Introduction to HTML & Web Structure",
        "HTML Document Structure (DOCTYPE, html, head, body)",
        "Headings, Paragraphs & Text Formatting",
        "Links and Anchors",
        "Images and Media",
      ],
      assignmentTitle: "Build a simple personal page",
      assignmentDesc: "Create a single HTML page with heading, paragraphs, at least one link and one image.",
      assignmentDoc: "Use only HTML. Include DOCTYPE, html, head (with title), body. Add h1, p, one <a> link, one <img>.",
    },
    {
      title: "Milestone 2: HTML Forms & Semantics",
      modules: [
        "Lists (ordered, unordered, description)",
        "Tables",
        "Forms and Input Types",
        "Semantic HTML (header, nav, main, footer, section, article)",
        "HTML5 Attributes and Validation",
      ],
      assignmentTitle: "Contact form with validation",
      assignmentDesc: "Create a contact form with name, email, message and use HTML5 validation attributes.",
      assignmentDoc: "Use required, type=email, placeholder. Wrap in <form>. Use semantic tags (header, main, footer).",
    },
    {
      title: "Milestone 3: CSS Fundamentals",
      modules: [
        "Introduction to CSS & Selectors",
        "Colors, Backgrounds & Borders",
        "Typography (fonts, size, weight)",
        "Box Model (margin, padding, border)",
        "Display and Visibility",
      ],
      assignmentTitle: "Style your HTML page with CSS",
      assignmentDesc: "Add a CSS file: set background color, font family, and center main content using box model.",
      assignmentDoc: "Link style.css. Set body background and font-family. Use a container with margin: 0 auto and max-width.",
    },
    {
      title: "Milestone 4: CSS Layout",
      modules: [
        "Flexbox Basics",
        "Flexbox Alignment and Wrap",
        "CSS Grid Introduction",
        "Grid Template Areas",
        "Responsive Layouts (media queries)",
      ],
      assignmentTitle: "Responsive layout with Flexbox/Grid",
      assignmentDesc: "Build a multi-section layout using Flexbox or Grid that adapts to small screens.",
      assignmentDoc: "Use flex or grid. Add a media query to stack or resize on narrow viewport.",
    },
    {
      title: "Milestone 5: Bootstrap Basics",
      modules: [
        "Bootstrap Introduction & Setup",
        "Bootstrap Grid System",
        "Bootstrap Components (buttons, cards, alerts)",
        "Bootstrap Forms & Input Groups",
        "Bootstrap Navigation & Navbar",
      ],
      assignmentTitle: "Landing page with Bootstrap",
      assignmentDesc: "Create a one-page landing using Bootstrap grid, navbar, buttons and cards.",
      assignmentDoc: "Include Bootstrap CSS/JS. Use container, row, col. Add navbar, at least one card and buttons.",
    },
    {
      title: "Milestone 6: Bootstrap & Components",
      modules: [
        "Bootstrap Modals & Dropdowns",
        "Bootstrap Carousel & Collapse",
        "Bootstrap Utilities (spacing, colors, display)",
        "Customizing Bootstrap (themes, variables)",
        "Building a Complete Page with Bootstrap",
      ],
      assignmentTitle: "Multi-section page with Bootstrap components",
      assignmentDesc: "Build a page with navbar, carousel or collapse, modals or dropdowns, and utility classes.",
      assignmentDoc: "Use at least: navbar, one of carousel/collapse, one of modal/dropdown. Use spacing/color utilities.",
    },
    {
      title: "Milestone 7: JavaScript Introduction",
      modules: [
        "JavaScript in the Browser (script tag, console)",
        "Variables (let, const, var)",
        "Data Types and Operators",
        "Conditional Statements (if, else, switch)",
        "Loops (for, while)",
      ],
      assignmentTitle: "Simple JavaScript (conditions & loops)",
      assignmentDesc: "Write a small script using variables, one conditional and one loop. Log output to console.",
      assignmentDoc: "Use let/const, if/else or switch, for or while. console.log results.",
    },
    {
      title: "Milestone 8: JavaScript Functions & DOM",
      modules: [
        "Functions (declaration, expression, parameters)",
        "DOM Selection (getElementById, querySelector)",
        "DOM Manipulation (innerHTML, textContent, style)",
        "Event Listeners (click, input, submit)",
        "Handling Form Data with JavaScript",
      ],
      assignmentTitle: "Interactive page (buttons & form handling)",
      assignmentDesc: "Add a button and/or form. Use JavaScript to change content or read form values on click/submit.",
      assignmentDoc: "Use querySelector or getElementById. addEventListener for click or submit. Update DOM or read input value.",
    },
    {
      title: "Milestone 9: JavaScript Time & Date",
      modules: [
        "Date Object and Creating Dates",
        "Getting and Setting Date/Time Parts",
        "Formatting Date and Time",
        "Timers (setTimeout, setInterval)",
        "Building a Simple Clock or Countdown",
      ],
      assignmentTitle: "Live clock or countdown timer",
      assignmentDesc: "Build a live clock or countdown timer using Date and setInterval.",
      assignmentDoc: "Use new Date(), getHours/getMinutes/getSeconds or similar. Use setInterval to update every second. Display in the page.",
    },
    {
      title: "Milestone 10: Capstone",
      modules: [
        "Project Structure and Best Practices",
        "Combining HTML, CSS, Bootstrap",
        "Adding Interactivity with JavaScript",
        "Debugging and Browser DevTools",
        "Final Project Overview",
      ],
      assignmentTitle: "Final assignment / mini project",
      assignmentDesc: "Build a small multi-page or single-page project using HTML, CSS, Bootstrap and JavaScript (including a time/date feature).",
      assignmentDoc: "Combine all: semantic HTML, CSS layout, Bootstrap, JS interactivity, and at least one time/date feature (clock, countdown, or formatted date).",
    },
  ];

  data.forEach((milestone, mi) => {
    const msId = `ms${mi + 1}`;
    const modules: ModuleItem[] = milestone.modules.map((title, i) => {
      globalOrder += 1;
      return {
        id: `m${globalOrder}`,
        order: globalOrder,
        title,
        videoUrl: DUMMY_VIDEO,
        duration: "10:00",
      };
    });
    const assignment: HomeworkTask = {
      id: `a${mi + 1}`,
      milestoneId: msId,
      title: milestone.assignmentTitle,
      description: milestone.assignmentDesc,
      documentation: milestone.assignmentDoc,
    };
    milestones.push({
      id: msId,
      order: mi + 1,
      title: milestone.title,
      modules,
      assignment,
    });
  });

  return milestones;
}

const WEB_DESIGN_MILESTONES = buildWebDesignMilestones();

function flattenModules(milestones: MilestoneItem[]): ModuleItem[] {
  const out: ModuleItem[] = [];
  milestones.forEach((ms) => ms.modules.forEach((m) => out.push(m)));
  return out;
}

function flattenHomework(milestones: MilestoneItem[]): HomeworkTask[] {
  return milestones.map((ms) => ms.assignment);
}

const CLASS_CONTENT: Record<string, { milestones: MilestoneItem[] }> = {
  [COURSE_TITLE_WEB_DESIGN]: { milestones: WEB_DESIGN_MILESTONES },
};

export function getClassContent(courseTitle: string): {
  milestones: MilestoneItem[];
  modules: ModuleItem[];
  homework: HomeworkTask[];
} {
  const milestones = CLASS_CONTENT[courseTitle]?.milestones ?? [];
  return {
    milestones,
    modules: flattenModules(milestones),
    homework: flattenHomework(milestones),
  };
}

export function getModuleById(courseTitle: string, moduleId: string): ModuleItem | undefined {
  const { modules } = getClassContent(courseTitle);
  return modules.find((m) => m.id === moduleId);
}

export function getHomeworkByMilestone(courseTitle: string, milestoneId: string): HomeworkTask | undefined {
  const { milestones } = getClassContent(courseTitle);
  return milestones.find((ms) => ms.id === milestoneId)?.assignment;
}

export function getHomeworkById(courseTitle: string, homeworkId: string): HomeworkTask | undefined {
  const { homework } = getClassContent(courseTitle);
  return homework.find((h) => h.id === homeworkId);
}

export function getMilestoneByModuleId(courseTitle: string, moduleId: string): MilestoneItem | undefined {
  const { milestones } = getClassContent(courseTitle);
  return milestones.find((ms) => ms.modules.some((m) => m.id === moduleId));
}

export function getMilestoneById(courseTitle: string, milestoneId: string): MilestoneItem | undefined {
  const { milestones } = getClassContent(courseTitle);
  return milestones.find((ms) => ms.id === milestoneId);
}
