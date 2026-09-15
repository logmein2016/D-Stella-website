import type { LucideIcon } from "lucide-react";
import { PhoneCall, PenTool, FileCheck2, Factory, KeyRound } from "lucide-react";

export type ProcessStep = {
  title: string;
  desc: string;
  icon: LucideIcon;
};

// The five stages shown on the /process page's chevron. Kept distinct from
// the shorter 3-step "How it works" summary on the homepage (lib/data/
// workflow-steps.ts) — this is the fuller version, including the two stages
// clients ask about most: the design sign-off before anything is built, and
// what handover actually involves.
export const processSteps: ProcessStep[] = [
  {
    title: "Consultation",
    desc: "A free, no-obligation call or site visit to understand your home, your budget and how you actually live in the space.",
    icon: PhoneCall,
  },
  {
    title: "Design",
    desc: "Our designers put together room-by-room layouts, 3D views and material options built around your brief.",
    icon: PenTool,
  },
  {
    title: "Design Lock",
    desc: "You review, ask for changes, and finally sign off on the design and the costing — so there are no surprises once production starts.",
    icon: FileCheck2,
  },
  {
    title: "Execution",
    desc: "Furniture and finishes are produced at our own factories while site work — electrical, civil, painting — runs in parallel.",
    icon: Factory,
  },
  {
    title: "Handover",
    desc: "Everything is installed, snags are cleared, and your home is handed over ready to move into.",
    icon: KeyRound,
  },
];
