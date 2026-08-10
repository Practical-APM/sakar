import type { Principle } from "@/types";
import { strengths } from "./experience";

/** Resume strengths, shown in the loadout section. */
export const principles: Principle[] = strengths.map((text, i) => ({
  id: `strength-${i}`,
  text,
  icon: (["lightbulb", "target", "people", "pulse"] as const)[i] ?? "compass",
}));
