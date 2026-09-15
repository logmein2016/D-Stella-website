// Portfolio project records. Photography is real (client homes, supplied by
// D'Stella). Budget figures are illustrative placeholders only — indicative
// ranges consistent with the estimator's price table, not confirmed client
// figures — pending real per-project numbers from D'Stella.
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
  photoSrc?: string;
  photoAlt: string;
};

export const projects: Project[] = [
  {
    id: "patia-enclave",
    name: "Prestige lakefont",
    bhk: "2",
    budget: "₹7.4L*",
    featured: true,
    photoSrc: "/photos/portfolio/prestige-lakefont.jpg",
    photoAlt: "Prestige lakefont, a 2 BHK apartment interior in Bangalore",
  },
  {
    id: "chandrasekharpur-residency",
    name: "Spectra Palmwoods",
    bhk: "3",
    budget: "₹9.6L*",
    featured: true,
    photoSrc: "/photos/portfolio/spectra-palmwoods.jpg",
    photoAlt: "Spectra Palmwoods, a 3 BHK apartment interior in Bangalore",
  },
  {
    id: "nayapalli-greens",
    name: "ASN Heights",
    bhk: "2",
    budget: "₹8.6L*",
    featured: true,
    photoSrc: "/photos/portfolio/asn-heights.jpg",
    photoAlt: "ASN Heights, a 2 BHK apartment interior in Bangalore",
  },
  {
    id: "kalinga-vihar",
    name: "Brigade Utopia",
    bhk: "3",
    budget: "₹11.2L*",
    featured: true,
    photoSrc: "/photos/portfolio/brigade-utopia.jpg",
    photoAlt: "Brigade Utopia, a 3 BHK apartment interior in Bangalore",
  },
  {
    id: "jaydev-vihar-residences",
    name: "Spectra Raaya",
    bhk: "3",
    budget: "₹10.4L*",
    featured: false,
    photoSrc: "/photos/portfolio/spectra-raaya.jpg",
    photoAlt: "Spectra Raaya, a 3 BHK apartment interior in Bangalore",
  },
  {
    id: "sailashree-vihar",
    name: "Prestige Lakeside habitat",
    bhk: "2",
    budget: "₹9.8L*",
    featured: false,
    photoSrc: "/photos/portfolio/prestige-lakeside-habitat.jpg",
    photoAlt: "Prestige Lakeside habitat, a 2 BHK apartment interior in Bangalore",
  },
  {
    id: "niladri-vihar",
    name: "Republic of Whitefield",
    bhk: "2",
    budget: "₹6.9L*",
    featured: false,
    photoSrc: "/photos/portfolio/republic-of-whitefield.jpg",
    photoAlt: "Republic of Whitefield, a 2 BHK apartment interior in Bangalore",
  },
  {
    id: "pahal-heights",
    name: "Sumadhura Follium",
    bhk: "3",
    budget: "₹13.1L*",
    featured: false,
    photoSrc: "/photos/portfolio/sumadhura-follium.jpg",
    photoAlt: "Sumadhura Follium, a 3 BHK apartment interior in Bangalore",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export const workFilterOptions: { value: "all" | Bhk; label: string }[] = [
  { value: "all", label: "All" },
  { value: "2", label: "2 BHK" },
  { value: "3", label: "3 BHK" },
];
