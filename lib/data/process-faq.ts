export type ProcessFaqItem = {
  question: string;
  answer: string;
};

// Grounded in what's already stated elsewhere on the site (process steps,
// the About page's promises, the homepage's timeline figure) -- no new
// claims invented here.
export const processFaq: ProcessFaqItem[] = [
  {
    question: "How long does a project typically take?",
    answer:
      "Design lock to handover usually runs around 40 days, though it depends on design complexity and material sourcing. The Design and Design Lock stages before that vary more, since they depend on how quickly we land on a brief you're happy with.",
  },
  {
    question: "What if I want to change something after Design Lock?",
    answer:
      "Changes are still possible, but they get harder and costlier once production has started — that's exactly why we ask you to review the 3D views and costing carefully before signing off at Design Lock.",
  },
  {
    question: "Do I need to be on-site during Execution?",
    answer:
      "Not full-time. We need site access for our team, and a single point of contact if you're not around yourself day to day.",
  },
  {
    question: "Will the cost change once work starts?",
    answer:
      "No. The costing you sign off on at Design Lock is the costing — we tell you the real cost up front, not a ballpark that grows once work starts.",
  },
  {
    question: "What actually happens at handover?",
    answer:
      "A final walkthrough with us to flag anything before you move in — everything installed, snags cleared, and the home ready to live in.",
  },
  {
    question: "Is the first consultation really free?",
    answer:
      "Yes — a free, no-obligation call or site visit, with no pressure to commit afterwards.",
  },
];
