export type GalleryPhoto = {
  src: string;
  alt: string;
};

export type GalleryRoom = {
  slug: string;
  name: string;
  desc: string;
  coverSrc: string;
  photos: GalleryPhoto[];
};

// Real D'Stella project photography, grouped by room type for the Portfolio
// page's folder browsing. Distinct from lib/data/rooms.ts (the homepage's
// six-card "room by room" teaser) — this is the fuller, portfolio-side set,
// pulling in extra real photos from the same client-supplied batches.
export const galleryRooms: GalleryRoom[] = [
  {
    slug: "drawing-room",
    name: "Drawing Room",
    desc: "Living rooms designed for both everyday evenings and festive gatherings.",
    coverSrc: "/photos/rooms/drawing-room.jpg",
    photos: [
      { src: "/photos/rooms/drawing-room.jpg", alt: "Living room with a sectional sofa, gold pendant chandelier and skyline view" },
      { src: "/photos/gallery/drawing-room/living-blue-sofa.jpg", alt: "Living room with a blue tufted sofa and a wall of family photographs" },
      { src: "/photos/gallery/drawing-room/living-tv-wall.jpg", alt: "Living room with a brown sofa and a wood-slat TV wall" },
      { src: "/photos/gallery/drawing-room/brick-arch-landing.jpg", alt: "Landing area with a brick feature arch and a tripod floor lamp" },
    ],
  },
  {
    slug: "dining",
    name: "Dining",
    desc: "Everyday and festive dining setups built around real family life.",
    coverSrc: "/photos/rooms/dining.jpg",
    photos: [
      { src: "/photos/rooms/dining.jpg", alt: "Dining room with a marble-top table, cream chairs and a family photo wall" },
    ],
  },
  {
    slug: "pooja",
    name: "Pooja",
    desc: "Dedicated mandir units, from a compact wall-mounted unit to a full jali-panel room divider.",
    coverSrc: "/photos/gallery/pooja/mandir-unit.jpg",
    photos: [
      { src: "/photos/gallery/pooja/mandir-unit.jpg", alt: "A full mandir unit with carved pillars, brass finials and a lit Om motif" },
      { src: "/photos/gallery/pooja/jali-door.jpg", alt: "A pooja room door with a mirrored jali cutout pattern and diya motifs" },
      { src: "/photos/gallery/pooja/bells-detail.jpg", alt: "Detail of brass temple bells against a backlit jali panel with an Om cutout" },
      { src: "/photos/gallery/pooja/om-panel.jpg", alt: "Backlit jali panel with an Om cutout and hanging brass bells" },
    ],
  },
  {
    slug: "bedroom",
    name: "Bedroom",
    desc: "Wardrobes and layouts that maximise storage without crowding the room.",
    coverSrc: "/photos/rooms/bedroom.jpg",
    photos: [
      { src: "/photos/rooms/bedroom.jpg", alt: "Bedroom with a herringbone-pattern bed and a backlit round mirror" },
      { src: "/photos/gallery/bedroom/pink-wardrobe.jpg", alt: "Bedroom with a pink and white mirrored wardrobe and a carved wood bed" },
      { src: "/photos/gallery/bedroom/teal-wardrobe.jpg", alt: "Bedroom entry with a glossy teal sliding wardrobe and matching dresser" },
    ],
  },
  {
    slug: "kitchen",
    name: "Kitchen",
    desc: "Modular kitchens built for Indian cooking, with easy-to-clean, long-lasting finishes.",
    coverSrc: "/photos/rooms/Kicthen_Final.png",
    photos: [
      { src: "/photos/rooms/Kicthen_Final.png", alt: "Parallel modular kitchen with olive cabinetry and marble backsplash" },
    ],
  },
  {
    slug: "study",
    name: "Study",
    desc: "Dedicated work corners with proper lighting and cable-free desks.",
    coverSrc: "/photos/rooms/studyunit.png",
    photos: [
      { src: "/photos/rooms/studyunit.png", alt: "Study with a built-in desk, backlit open shelving and a window seat" },
    ],
  },
  {
    slug: "kids-room",
    name: "Kids' Room",
    desc: "Durable, playful designs that adapt as children grow older.",
    coverSrc: "/photos/rooms/Kids bedroom with cricket walpaper.png",
    photos: [
      { src: "/photos/rooms/Kids bedroom with cricket walpaper.png", alt: "Kids' bedroom with a cricket-themed mural and study desk" },
    ],
  },
];

export const findGalleryRoom = (slug: string) => galleryRooms.find((r) => r.slug === slug);
