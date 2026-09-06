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
    name: "Prestige lakefont",
    bhk: "2",
    budget: "",
    featured: true,
    photoAlt: "Prestige lakefont, a 2 BHK apartment interior in Bangalore",
  },
  {
    id: "chandrasekharpur-residency",
    name: "Spectra Palmwoods",
    bhk: "3",
    budget: "",
    featured: true,
    photoAlt: "Spectra Palmwoods, a 3 BHK apartment interior in Bangalore",
  },
  {
    id: "nayapalli-greens",
    name: "ASN Heights",
    bhk: "2",
    budget: "",
    featured: true,
    photoAlt: "ASN Heights, a 2 BHK apartment interior in Bangalore",
  },
  {
    id: "kalinga-vihar",
    name: "Brigade Utopia",
    bhk: "3",
    budget: "",
    featured: true,
    photoAlt: "Brigade Utopia, a 3 BHK apartment interior in Bangalore",
  },
  {
    id: "jaydev-vihar-residences",
    name: "Spectra Raaya",
    bhk: "3",
    budget: "",
    featured: false,
    photoAlt: "Spectra Raaya, a 3 BHK apartment interior in Bangalore",
  },
  {
    id: "sailashree-vihar",
    name: "Prestige Lakeside habitat",
    bhk: "2",
    budget: "",
    featured: false,
    photoAlt: "Prestige Lakeside habitat, a 2 BHK apartment interior in Bangalore",
  },
  {
    id: "niladri-vihar",
    name: "Republic of Whitefield",
    bhk: "2",
    budget: "",
    featured: false,
    photoAlt: "Republic of Whitefield, a 2 BHK apartment interior in Bangalore",
  },
  {
    id: "pahal-heights",
    name: "Sumadhura Follium",
    bhk: "3",
    budget: "",
    featured: false,
    photoAlt: "Sumadhura Follium, a 3 BHK apartment interior in Bangalore",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export const workFilterOptions: { value: "all" | Bhk; label: string }[] = [
  { value: "all", label: "All" },
  { value: "2", label: "2 BHK" },
  { value: "3", label: "3 BHK" },
];
