export type ServiceGroup = {
  title: string;
  /** What's covered — the individual services from the old 15-icon grid. */
  items: string[];
  photo: { src: string; alt: string };
};

// What's covered under "room-by-room design, in-house production and
// on-site execution" (see the hero/about copy), grouped into five areas so
// the homepage reads as a few clear offerings rather than a wall of icons.
// Every one of the original 15 services appears in exactly one group.
export const serviceGroups: ServiceGroup[] = [
  {
    title: "Kitchens",
    items: ["Modular kitchens", "Crockery & display units"],
    photo: {
      src: "/photos/rooms/Kicthen_Final.png",
      alt: "Parallel modular kitchen with olive cabinetry and a marble backsplash",
    },
  },
  {
    title: "Wardrobes & Storage",
    items: ["Bedroom wardrobes", "Space-saving furniture", "Foyer & entrance units"],
    photo: {
      src: "/photos/gallery/bedroom/teal-wardrobe.jpg",
      alt: "Teal high-gloss sliding wardrobe with a geometric inlay",
    },
  },
  {
    title: "Living, Dining & Pooja",
    items: ["TV units & living spaces", "Dining rooms", "Pooja units", "Loose furniture & seating"],
    photo: {
      src: "/photos/gallery/drawing-room/living-tv-wall.jpg",
      alt: "Living room with a wall-mounted TV unit and brown sofas",
    },
  },
  {
    title: "Bedrooms & Study",
    items: ["Master bedrooms", "Kids' bedrooms", "Study units", "Curtains & soft furnishings"],
    photo: {
      src: "/photos/rooms/bedroom.jpg",
      alt: "Bedroom with a panelled wall, upholstered headboard and cove lighting",
    },
  },
  {
    title: "Ceilings, Lighting & Civil Work",
    items: ["False ceilings & lighting", "Electrical & civil work"],
    photo: {
      src: "/photos/rooms/HomePage_Living_Final.png",
      alt: "Double-height living room with a layered false ceiling and ring chandelier",
    },
  },
];
