import type { LucideIcon } from "lucide-react";
import { Pencil, Factory, Truck } from "lucide-react";

export type WorkflowStep = {
  title: string;
  desc: string;
  icon: LucideIcon;
};

// Order and copy are deliberate — see the README's "Design history worth
// respecting" note. No numerals, label lives inside the circle only.
export const workflowSteps: WorkflowStep[] = [
  {
    title: "Design",
    desc: "Talk to our designer, get an estimate, and approve your detailed drawings.",
    icon: Pencil,
  },
  {
    title: "Production",
    desc: "Your furniture and finishes are built to spec at our own factories.",
    icon: Factory,
  },
  {
    title: "Execution",
    desc: "Material is delivered on-site, installed, and handed over on time.",
    icon: Truck,
  },
];
