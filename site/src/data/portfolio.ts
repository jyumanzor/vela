export type Project = {
  slug: string;
  name: string;
  category: string;
  status: "Live" | "Paused" | "Private" | "Here";
  headline: string;
  summary: string;
  url: string;
  contents: string[];
  approach: string;
};
export const portfolioCheckedOn = "September 20, 2026";
export const projects: Project[] = [
  {
    slug: "harper",
    name: "Harper",
    category: "Education",
    status: "Live",
    headline: "A student-built guide to Booth.",
    summary:
      "Recruiting guidance, course discovery and planning resources in one place.",
    url: "https://harper-booth-guide.vercel.app",
    contents: [
      "Recruiting guide and resource directory",
      "Course catalog and connected course map",
      "A publishing workflow for keeping student resources current",
    ],
    approach:
      "A clear student-facing index brings separate guides together without replacing the original school sources.",
  },
  {
    slug: "jenn-site",
    name: "Jenn Umanzor",
    category: "Personal",
    status: "Live",
    headline: "A personal site with room for a whole life.",
    summary:
      "Essays, running, work, travel and a growing archive of interests.",
    url: "https://jennumanzor.com",
    contents: [
      "Research essays and interactive explanations",
      "Running, travel, dining and culture collections",
      "A public portfolio alongside private personal tools",
    ],
    approach:
      "One editorial system connects very different subjects; Vela provides the deeper view of the software itself.",
  },
  {
    slug: "ldr-hub",
    name: "LDR Hub",
    category: "Work & research",
    status: "Live",
    headline: "A shared home for training and reference.",
    summary: "A learning and reference platform for litigation consulting.",
    url: "https://ldrhub.vercel.app",
    contents: [
      "Training materials and reference guides",
      "AI methods and workflow guidance",
      "Tools that support repeatable professional work",
    ],
    approach:
      "The project organizes recurring questions around the work people need to do, with access boundaries for internal material.",
  },
  {
    slug: "project-clifford",
    name: "Project Clifford",
    category: "Work & research",
    status: "Live",
    headline: "The process behind an intern case simulation.",
    summary:
      "An account of the workstreams, review controls and learning behind a summer program.",
    url: "https://project-clifford.vercel.app",
    contents: [
      "Case-simulation narrative",
      "Seven-stage operating process",
      "Review controls and lessons from delivery",
    ],
    approach:
      "The public account makes the working process visible: what happened, why a control existed, and what should carry forward.",
  },
  {
    slug: "fisheries",
    name: "Fisheries Research Studio",
    category: "Work & research",
    status: "Live",
    headline: "A research question with a traceable answer.",
    summary: "A public-data workbench for Florida commercial fisheries.",
    url: "https://fti-fisheries-research-studio.vercel.app",
    contents: [
      "Spiny lobster and stone crab research",
      "Source-linked interactive analysis",
      "Excel-ready export and an AI-adoption landscape",
    ],
    approach:
      "Research stays close to the underlying sources and rows, with a handoff that can be inspected outside the website.",
  },
  {
    slug: "maritza",
    name: "Maritza J. Jones",
    category: "Client sites",
    status: "Live",
    headline: "A welcoming home for a tax practice.",
    summary:
      "A bilingual service website for individual, business and estate tax preparation.",
    url: "https://maritza-jones-accounting.vercel.app",
    contents: [
      "Service pages for three kinds of tax work",
      "About, process and frequently asked questions",
      "Spanish information and direct contact",
    ],
    approach:
      "The design emphasizes clarity, approachability and a direct route to a conversation with the practitioner.",
  },
  {
    slug: "doldol",
    name: "Doldol Studio",
    category: "Client sites",
    status: "Paused",
    headline: "Fine-line tattoos, with the artist at the center.",
    summary: "A tattoo portfolio and studio experience for Ten in Brooklyn.",
    url: "",
    contents: [
      "Flash collections and completed tattoo work",
      "Design-discovery quiz and booking flow",
      "Studio information and client-facing tools",
    ],
    approach:
      "The artwork leads the experience, with space for discovery before a visitor decides what to book.",
  },
  {
    slug: "cinque",
    name: "Cinque Photography",
    category: "Client sites",
    status: "Paused",
    headline: "Photography arranged around place.",
    summary:
      "A photography portfolio with country collections and an interactive map.",
    url: "",
    contents: [
      "France, United Kingdom, United States and Italy collections",
      "Large photo viewer and selected work",
      "Services and contact information",
    ],
    approach:
      "Place provides a natural path through the photographs; the interface supports looking rather than competing with the images.",
  },
  {
    slug: "carina",
    name: "Carina",
    category: "Work & research",
    status: "Paused",
    headline: "A research program organized around its next question.",
    summary: "A research and decision hub for the ProteoCAD collaboration.",
    url: "",
    contents: [
      "Research questions and evidence organization",
      "Program decisions and meeting notes",
      "Funding leads tied to research needs",
    ],
    approach:
      "The hub connects questions, claims and next tests; detailed research and collaboration records remain private.",
  },
  {
    slug: "ai-use-case-lab",
    name: "AI Use-Case Lab",
    category: "Work & research",
    status: "Private",
    headline: "Practice the judgment before choosing the tool.",
    summary: "The interactive lab previously hosted as strategy-jenn-os.",
    url: "/access/jenn/workspace/lab",
    contents: [
      "Decision exercises and task routing",
      "Permission and human-review boundaries",
      "Test records and strategy notes",
    ],
    approach:
      "The lab keeps tool choice, permission and evidence requirements separate. Its original internal examples are retained in the private workspace.",
  },
  {
    slug: "vela",
    name: "Vela",
    category: "Tools & methods",
    status: "Here",
    headline: "Projects, methods and private workspaces.",
    summary:
      "The home for this collection and the reusable material behind it.",
    url: "/rules",
    contents: [
      "Project directory and individual project notes",
      "Rules, tools, explainers and starter kits",
      "Existing client workspaces and idea maps",
    ],
    approach:
      "The portfolio and working areas share a design language while keeping public descriptions separate from private workspace content.",
  },
];
export const categories = [
  "All",
  "Client sites",
  "Work & research",
  "Education",
  "Personal",
  "Tools & methods",
];
