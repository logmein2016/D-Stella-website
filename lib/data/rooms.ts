export type Room = {
  id: string;
  name: string;
  kicker: string;
  desc: string;
  photoSrc?: string;
  photoAlt?: string;
  photoCredit?: string;
  photoCreditHref?: string;
};

// Kitchen, Study and Kids' Room have no photography yet (per the handoff) —
// photoSrc is left undefined and RoomCard renders its empty state for those.
export const rooms: Room[] = [
  {
    id: "room-drawing",
    name: "Drawing Room",
    kicker: "Living & entertaining",
    desc: "Seating, storage and lighting planned for how your family actually gathers.",
    photoSrc:
      "https://images.unsplash.com/photo-1759238136854-a43787126db7?fm=jpg&q=80&w=1200&auto=format&fit=crop",
    photoAlt: "Editorial living room with warm seating and soft lighting",
    photoCredit: "Photo by Franco Debartolo on Unsplash",
    photoCreditHref: "https://unsplash.com/@francotheshooter",
  },
  {
    id: "room-dining",
    name: "Dining",
    kicker: "Everyday & festive",
    desc: "Compact dining setups that expand comfortably for guests and celebrations.",
    photoSrc:
      "https://images.unsplash.com/photo-1768609239321-1cfe14893e80?fm=jpg&q=80&w=1200&auto=format&fit=crop",
    photoAlt: "Warm wood-toned dining interior",
    photoCredit: "Photo by rawkkim on Unsplash",
    photoCreditHref: "https://unsplash.com/@rawkkim",
  },
  {
    id: "room-kitchen",
    name: "Kitchen",
    kicker: "Modular & durable",
    desc: "Modular kitchens built for Indian cooking, with easy-to-clean, long-lasting finishes.",
  },
  {
    id: "room-bedroom",
    name: "Bedroom",
    kicker: "Rest & storage",
    desc: "Wardrobes and layouts that maximise storage without crowding the room.",
    photoSrc:
      "https://images.unsplash.com/photo-1741394546743-2d64519ba0d3?fm=jpg&q=80&w=1200&auto=format&fit=crop",
    photoAlt: "Minimalist white bedroom interior",
    photoCredit: "Photo by tommao wang on Unsplash",
    photoCreditHref: "https://unsplash.com/@tommaomaoer",
  },
  {
    id: "room-study",
    name: "Study",
    kicker: "Focus & work from home",
    desc: "A dedicated work corner with proper lighting and cable-free desks.",
  },
  {
    id: "room-kids",
    name: "Kids’ Room",
    kicker: "Play & grow",
    desc: "Durable, playful designs that adapt as your children grow older.",
  },
];

// Hero carousel reuses the same three photographed rooms, in this order:
// Drawing Room, Dining, Bedroom.
const byId = (id: string): Room => {
  const room = rooms.find((r) => r.id === id);
  if (!room) throw new Error(`Unknown room id: ${id}`);
  return room;
};

export const heroSlides: Room[] = [
  byId("room-drawing"),
  byId("room-dining"),
  byId("room-bedroom"),
];
