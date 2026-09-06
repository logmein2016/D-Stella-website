// Placeholder project records pending real client data (per the handoff).
// Living here as a data module — not hard-coded in the views — so a future
// CMS swap only touches this file.

export type Bhk = "2" | "3";

export type Project = {
  id: string;
  name: string;
  bhk: Bhk;
  budget: string;
  /** Featured on the home page's "Recent work" section (4 of the 8). */
  featured: boolean;
  photoAlt: string;
};

export const projects: Project[] = [
  {
    id: "patia-enclave",
    name: "Patia Enclave",
    bhk: "2",
    budget: "₹7.2L",
    featured: true,
    photoAlt: "Patia Enclave, a 2 BHK apartment interior in Bhubaneswar",
  },
  {
    id: "chandrasekharpur-residency",
    name: "Chandrasekharpur Residency",
    bhk: "3",
    budget: "₹10.5L",
    featured: true,
    photoAlt: "Chandrasekharpur Residency, a 3 BHK apartment interior in Bhubaneswar",
  },
  {
    id: "nayapalli-greens",
    name: "Nayapalli Greens",
    bhk: "2",
    budget: "₹8L",
    featured: true,
    photoAlt: "Nayapalli Greens, a 2 BHK apartment interior in Bhubaneswar",
  },
  {
    id: "kalinga-vihar",
    name: "Kalinga Vihar",
    bhk: "3",
    budget: "₹11.8L",
    featured: true,
    photoAlt: "Kalinga Vihar, a 3 BHK apartment interior in Bhubaneswar",
  },
  {
    id: "jaydev-vihar-residences",
    name: "Jaydev Vihar Residences",
    bhk: "3",
    budget: "₹12.4L",
    featured: false,
    photoAlt: "Jaydev Vihar Residences, a 3 BHK apartment interior in Bhubaneswar",
  },
  {
    id: "sailashree-vihar",
    name: "Sailashree Vihar",
    bhk: "2",
    budget: "₹6.9L",
    featured: false,
    photoAlt: "Sailashree Vihar, a 2 BHK apartment interior in Bhubaneswar",
  },
  {
    id: "niladri-vihar",
    name: "Niladri Vihar",
    bhk: "2",
    budget: "₹8.3L",
    featured: false,
    photoAlt: "Niladri Vihar, a 2 BHK apartment interior in Bhubaneswar",
  },
  {
    id: "pahal-heights",
    name: "Pahal Heights",
    bhk: "3",
    budget: "₹11.1L",
    featured: false,
    photoAlt: "Pahal Heights, a 3 BHK apartment interior in Bhubaneswar",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export const workFilterOptions: { value: "all" | Bhk; label: string }[] = [
  { value: "all", label: "All" },
  { value: "2", label: "2 BHK" },
  { value: "3", label: "3 BHK" },
];
