import type { LucideIcon } from "lucide-react";
import {
  ChefHat,
  Shirt,
  Tv,
  UtensilsCrossed,
  BedDouble,
  LampDesk,
  ToyBrick,
  Flame,
  Lightbulb,
  Wine,
  DoorOpen,
  Layers,
  Blinds,
  Sofa,
  HardHat,
} from "lucide-react";

export type Service = {
  title: string;
  icon: LucideIcon;
};

// What's covered under "room-by-room design, in-house production and
// on-site execution" (see the hero/about copy) -- matches the room
// categories already shown in the portfolio, plus the electrical/civil
// scope mentioned on the Process page's Execution stage.
export const services: Service[] = [
  { title: "Modular Kitchen", icon: ChefHat },
  { title: "Wardrobes & Storage", icon: Shirt },
  { title: "TV Unit & Living Spaces", icon: Tv },
  { title: "Dining Room", icon: UtensilsCrossed },
  { title: "Master Bedroom", icon: BedDouble },
  { title: "Study Unit", icon: LampDesk },
  { title: "Kids' Bedroom", icon: ToyBrick },
  { title: "Pooja Unit", icon: Flame },
  { title: "False Ceiling & Lighting", icon: Lightbulb },
  { title: "Crockery & Display Units", icon: Wine },
  { title: "Foyer & Entrance", icon: DoorOpen },
  { title: "Space-Saving Furniture", icon: Layers },
  { title: "Curtains & Soft Furnishings", icon: Blinds },
  { title: "Loose Furniture & Seating", icon: Sofa },
  { title: "Electrical & Civil Work", icon: HardHat },
];
