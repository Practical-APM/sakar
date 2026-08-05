import type { Project } from "@/types";

export const projects: Project[] = [
  {
    name: "Knuud",
    thesis: "Knowledge that finds you before you search.",
    description:
      "An AI knowledge platform that turns scattered institutional memory into a living, searchable fabric.",
    role: "Product Lead",
    year: "2024",
    tags: ["AI", "Knowledge", "Platform"],
    slug: "knuud",
    icon: "knuud",
  },
  {
    name: "HyperSync",
    thesis: "HR systems that speak the same language.",
    description:
      "Integration layer connecting fragmented HR tools into one coherent operational flow.",
    role: "Product Manager",
    year: "2023",
    tags: ["Integrations", "HRTech", "API"],
    slug: "hypersync",
    icon: "hypersync",
  },
  {
    name: "Echo",
    thesis: "Automations that feel like muscle memory.",
    description:
      "Workflow tooling that lets teams encode decisions once and replay them with clarity.",
    role: "Product Manager",
    year: "2023",
    tags: ["Automation", "Workflows", "Tools"],
    slug: "echo",
    icon: "echo",
  },
  {
    name: "Beacon",
    thesis: "Signal over noise for product decisions.",
    description:
      "A lighthouse for metrics — surfacing what matters before the dashboard drowns it.",
    role: "Senior Product Manager",
    year: "2024",
    tags: ["Analytics", "Product", "Insights"],
    slug: "beacon",
    icon: "beacon",
  },
  {
    name: "Ledger",
    thesis: "Trust built into every transaction trail.",
    description:
      "Layered systems for auditability without slowing the people who move the work.",
    role: "Product Manager",
    year: "2022",
    tags: ["FinTech", "Systems", "Trust"],
    slug: "ledger",
    icon: "ledger",
  },
];

export const featuredProjects = projects.slice(0, 3);
export const swatchProjects = projects.filter((p) =>
  ["hypersync", "echo", "beacon", "ledger"].includes(p.slug),
);
