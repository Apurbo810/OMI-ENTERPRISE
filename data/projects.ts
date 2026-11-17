export type ProjectStatus = "completed" | "ongoing";

export const PROJECTS: {
  key: "projectOne" | "projectTwo" | "projectThree";
  status: ProjectStatus;
  image: string;
  href: string;
}[] = [
  { key: "projectOne", status: "completed", image: "/images/placeholders/project-placeholder.svg", href: "/projects" },
  { key: "projectTwo", status: "ongoing", image: "/images/placeholders/project-placeholder.svg", href: "/projects" },
  { key: "projectThree", status: "completed", image: "/images/placeholders/project-placeholder.svg", href: "/projects" },
];