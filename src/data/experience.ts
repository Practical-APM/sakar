import type { ExperienceEntry } from "@/types";

export const experience: ExperienceEntry[] = [
  {
    company: "Tartan",
    title: "Product Analyst",
    period: "Jun 2025 – Present",
    year: "2025",
    location: "Gurgaon, India",
    accent: "#92cc41",
    monogram: "TA",
    focus:
      "Owning product journeys and integration delivery for enterprise clients.",
    stats: [
      { value: "60%", label: "Faster TAT" },
      { value: "90+", label: "HRMS integrations" },
      { value: "10", label: "Developers led" },
    ],
    highlights: [
      "Shaped the HDFC corporate salary-account journey end to end — faster TAT and fewer drop-offs.",
      "Scaled partner integrations: 12 custom builds plus 90+ HRMS connections for MakeMyTrip, TravelPlus, and TripJack.",
      "Led a 10-developer team to ship client work on time.",
    ],
  },
  {
    company: "Vensure Employer Solutions",
    title: "Implementation Analyst",
    period: "Aug 2024 – Jun 2025",
    year: "2024",
    location: "Noida, India",
    accent: "#209cee",
    monogram: "VE",
    focus:
      "Turning product implementation into onboarding and retention outcomes.",
    stats: [
      { value: "40%", label: "More onboardings" },
      { value: "20%", label: "Lower turnover" },
      { value: "4", label: "Interns led" },
    ],
    highlights: [
      "Aligned new product implementation with business goals — not just go-lives.",
      "Led a data-collection form that lifted client onboarding in Q1 2025.",
      "Automated client communication with Jotform workflows and led 4 interns.",
    ],
  },
  {
    company: "B&IYA",
    title: "Cofounder",
    period: "Mar 2022 – Aug 2024",
    year: "2022",
    location: "Noida, India",
    accent: "#f7d51d",
    monogram: "BI",
    focus: "Building and shipping AI products from zero with a founding team.",
    stats: [
      { value: "25%", label: "Higher engagement" },
      { value: "15%", label: "Higher satisfaction" },
      { value: "30%", label: "Shorter timelines" },
    ],
    highlights: [
      "Owned end-to-end product for DonnaAI and Covalynce in an agile environment.",
      "Led a team of 10 and grew user engagement across the product suite.",
      "Closed the loop with feedback-driven design and a Notion-led delivery process.",
    ],
  },
];

export const education = {
  school: "NIT Mizoram",
  degree: "B.Tech, Computer Science Engineering",
  period: "Aug 2019 – May 2023",
  location: "Mizoram, India",
};

export const languages = [
  { name: "English", level: "Native" },
  { name: "Hindi", level: "Native" },
  { name: "Mewari", level: "Proficient" },
  { name: "Spanish", level: "Advanced" },
];

export const strengths = [
  "Problem Solving",
  "Leadership",
  "Strategic Thinking",
  "Innovation Driven",
];

export const skills = [
  "Artificial Intelligence",
  "API Integrations",
  "Project Management",
  "Sprint Ownership",
  "Agile",
  "B2B",
  "SaaS",
  "Wireframing",
  "JIRA",
  "Product Development",
  "Python",
];

export const interests = [
  {
    id: "reading",
    title: "Reading novels",
    detail: "Last read: 1984",
    accent: "#f7d51d",
  },
  {
    id: "liverpool",
    title: "Liverpool FC",
    detail: "",
    accent: "#e76e55",
  },
  {
    id: "music",
    title: "Indie music",
    detail: "",
    accent: "#209cee",
  },
] as const;

export type InterestId = (typeof interests)[number]["id"];

export const certifications = [
  {
    name: "Discovering Product Management",
    org: "Udacity",
  },
  {
    name: "Discovering Business Analytics",
    org: "Udacity",
  },
];

export const awards = [
  "Going the extra mile — TartanHQ",
  "Intern of the Month — Vensure",
];
