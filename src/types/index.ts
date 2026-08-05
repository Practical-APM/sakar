export interface Project {
  name: string;
  thesis: string;
  description: string;
  role: string;
  year: string;
  tags: string[];
  metrics?: string[];
  slug: string;
  icon: "knuud" | "hypersync" | "echo" | "beacon" | "ledger" | "styfin";
}

export interface ExperienceEntry {
  company: string;
  title: string;
  period: string;
  year: string;
}

export interface Principle {
  id: string;
  text: string;
  icon: "lightbulb" | "target" | "people" | "pulse" | "compass";
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface Vec2 {
  x: number;
  y: number;
}

export interface Hole {
  index: number;
  side: "left" | "right";
  position: Vec2;
  radius: number;
}

export interface HolePair {
  y: number;
  left: Hole;
  right: Hole;
}

export interface StitchEvent {
  index: number;
  hole: Hole;
  enterPosition: Vec2;
  exitPosition?: Vec2;
  completed: boolean;
}

export type StitchState =
  | "APPROACHING"
  | "ENTERING"
  | "HIDDEN"
  | "EMERGING"
  | "LOOPING"
  | "TIGHTENING"
  | "COMPLETE";

export interface ContentRect {
  left: number;
  top: number;
  right: number;
  bottom: number;
  id?: string;
}

export interface SeamPoint {
  x: number;
  y: number;
}
