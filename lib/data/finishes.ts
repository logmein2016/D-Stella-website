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

/** Rupees, [min, max]. */
export const priceTable: Record<Bhk, Record<Finish, [number, number]>> = {
  "2": {
    value: [500_000, 750_000],
    premium: [700_000, 900_000],
    luxury: [900_000, 1_100_000],
  },
  "3": {
    value: [700_000, 950_000],
    premium: [900_000, 1_150_000],
    luxury: [1_100_000, 1_400_000],
  },
};

/** [900000, 1100000] -> "₹9L – ₹11L"; [1150000, 1400000] -> "₹11.5L – ₹14L" */
export function formatLakh(n: number): string {
  return "₹" + (n / 100_000).toFixed(1).replace(/\.0$/, "") + "L";
}

export function formatPriceRange(bhk: Bhk, finish: Finish): string {
  const [min] = priceTable[bhk][finish];
  return formatLakh(min);
}
