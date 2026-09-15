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

// Real D'Stella project photography. Study has no photograph yet — RoomCard
// renders its empty state until a client home with a dedicated study is
// photographed.
export const rooms: Room[] = [
  {
    id: "room-drawing",
    name: "Drawing Room",
    kicker: "Living & entertaining",
    desc: "Seating, storage and lighting planned for how your family actually gathers.",
    photoSrc: "/photos/rooms/drawing-room.jpg",
    photoAlt: "D'Stella living room with a sectional sofa and skyline view",
  },
  {
    id: "room-dining",
    name: "Dining",
    kicker: "Everyday & festive",
    desc: "Compact dining setups that expand comfortably for guests and celebrations.",
    photoSrc: "/photos/rooms/dining.jpg",
    photoAlt: "D'Stella dining room with a marble-top table and display cabinet",
  },
  {
    id: "room-kitchen",
    name: "Kitchen",
    kicker: "Modular & durable",
    desc: "Modular kitchens built for Indian cooking, with easy-to-clean, long-lasting finishes.",
    photoSrc: "/photos/rooms/kitchen.jpg",
    photoAlt: "D'Stella modular kitchen with patterned tile backsplash",
  },
  {
    id: "room-bedroom",
    name: "Bedroom",
    kicker: "Rest & storage",
    desc: "Wardrobes and layouts that maximise storage without crowding the room.",
    photoSrc: "/photos/rooms/bedroom.jpg",
    photoAlt: "D'Stella bedroom with a tufted headboard and marble accent panel",
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
    photoSrc: "/photos/rooms/kids-room.jpg",
    photoAlt: "D'Stella kids' bedroom with a soft-pink mirrored wardrobe",
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
