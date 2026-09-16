import type { Bhk } from "./projects";

export type Finish = "value" | "premium" | "luxury";

export const finishOptions: { value: Finish; label: string }[] = [
  { value: "value", label: "Value" },
  { value: "premium", label: "Premium" },
  { value: "luxury", label: "Luxury" },
];

export const finishDescriptions: Record<Finish, string> = {
  value: "Laminate finishes, factory-made wardrobes, standard fittings. Durable and budget-first.",
  premium: "Richer laminates and veneers, semi-modular kitchen, branded fittings. Balanced quality and look.",
  luxury: "Premium veneers and acrylic, fully modular kitchen, designer lighting and hardware.",
};

export const finishLabels: Record<Finish, string> = {
  value: "Value",
  premium: "Premium",
  luxury: "Luxury",
};

/** Rupees, [min, max]. Only the min ("Starting from") is currently displayed. */
export const priceTable: Record<Bhk, Record<Finish, [number, number]>> = {
  "2": {
    value: [400_000, 400_000],
    premium: [600_000, 600_000],
    luxury: [850_000, 850_000],
  },
  "3": {
    value: [500_000, 500_000],
    premium: [650_000, 650_000],
    luxury: [950_000, 950_000],
  },
  "4": {
    value: [700_000, 700_000],
    premium: [950_000, 950_000],
    luxury: [1_150_000, 1_150_000],
  },
};

/** 400000 -> "₹4L"; 850000 -> "₹8.5L" */
export function formatLakh(n: number): string {
  return "₹" + (n / 100_000).toFixed(1).replace(/\.0$/, "") + "L";
}

export function formatPriceRange(bhk: Bhk, finish: Finish): string {
  const [min] = priceTable[bhk][finish];
  return formatLakh(min);
}
