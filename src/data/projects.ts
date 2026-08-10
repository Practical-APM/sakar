import type { Project } from "@/types";

/** Live products (not listed as separate resume entries; included by request). */
export const projects: Project[] = [
  {
    name: "Knuud",
    thesis: "AI knowledge product",
    description: "Live AI product.",
    role: "Product",
    year: "2024",
    tags: ["AI"],
    url: "https://knuud.space",
    slug: "knuud",
    icon: "knuud",
  },
  {
    name: "Syftn",
    thesis: "Product build",
    description: "Live product.",
    role: "Product",
    year: "2024",
    tags: ["Product"],
    url: "https://syftin.vercel.app",
    slug: "syftn",
    icon: "syftn",
  },
  {
    name: "Echo",
    thesis: "Covalynce · B&IYA",
    description: "Part of Covalynce, built at B&IYA.",
    role: "Cofounder · B&IYA",
    year: "2023",
    tags: ["Covalynce"],
    url: "https://covalynce-echo.vercel.app",
    slug: "echo",
    icon: "echo",
  },
  {
    name: "Beacon",
    thesis: "Covalynce · B&IYA",
    description: "Part of Covalynce, built at B&IYA.",
    role: "Cofounder · B&IYA",
    year: "2024",
    tags: ["Covalynce"],
    url: "https://covalynce-beacon.vercel.app",
    slug: "beacon",
    icon: "beacon",
  },
  {
    name: "Ledger",
    thesis: "Covalynce · B&IYA",
    description: "Part of Covalynce, built at B&IYA.",
    role: "Cofounder · B&IYA",
    year: "2023",
    tags: ["Covalynce"],
    url: "https://covalynce-ledger.vercel.app",
    slug: "ledger",
    icon: "ledger",
  },
];

export const covalynceProjects = projects.filter((p) =>
  ["echo", "beacon", "ledger"].includes(p.slug),
);

export const otherProjects = projects.filter((p) =>
  ["knuud", "syftn"].includes(p.slug),
);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
