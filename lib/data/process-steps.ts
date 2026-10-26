import type { LucideIcon } from "lucide-react";
import { PhoneCall, PenTool, FileCheck2, Factory, KeyRound } from "lucide-react";

export type ProcessStep = {
  title: string;
  desc: string;
  icon: LucideIcon;
  /** What we need from the client during this stage — set expectations
   * without inventing specific day-counts we haven't confirmed. */
  yourPart: string;
  /** Image shown beside the stage details. `position` sets the crop focus
   * (CSS object-position) when the image's shape differs from the frame. */
  photo: { src: string; alt: string; position?: string };
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
    yourPart: "Just your availability for a call or site visit — and a rough sense of your budget.",
    photo: {
      src: "/photos/process/consultation.jpg",
      alt: "Consultation table with a D'Stella Interiors notebook, floor plan and material samples",
      // Wide banner with the table on the left — keep that side in frame.
      position: "20% 50%",
    },
  },
  {
    title: "Design",
    desc: "Our designers put together room-by-room layouts, 3D views and material options built around your brief.",
    icon: PenTool,
    yourPart: "Any reference photos or a Pinterest board helps, plus your feedback on the first draft.",
    photo: {
      src: "/photos/process/design.jpg",
      alt: "D'Stella designer walking a couple through a floor plan and material samples",
    },
  },
  {
    title: "Design Lock",
    desc: "You review, ask for changes, and finally sign off on the design and the costing — so there are no surprises once production starts.",
    icon: FileCheck2,
    yourPart: "Review the 3D views and costing carefully — changes get harder (and costlier) to make once production starts.",
    photo: {
      src: "/photos/process/design-lock.jpg",
      alt: "D'Stella designer shaking hands with a client over the final design boards",
    },
  },
  {
    title: "Execution",
    desc: "Furniture and finishes are produced at our own factories while site work — electrical, civil, painting — runs in parallel.",
    icon: Factory,
    yourPart: "Site access for our team, and a single point of contact if you're not on-site yourself.",
    photo: {
      src: "/photos/process/execution.jpg",
      alt: "D'Stella team building furniture in the factory, delivering it and installing it on site",
    },
  },
  {
    title: "Handover",
    desc: "Everything is installed, snags are cleared, and your home is handed over ready to move into.",
    icon: KeyRound,
    yourPart: "A final walkthrough with us to flag anything before you move in.",
    photo: {
      src: "/photos/process/handover.jpg",
      alt: "D'Stella designer handing the keys to a couple in their finished living room",
    },
  },
];
