import { CabinBookingDetails, HeroStats, NavItem } from "../types";

export const NAV_ITEMS: NavItem[] = [
  { label: "Locations", href: "#locations" },
  { label: "Rooms", href: "#rooms" },
  { label: "Experiences", href: "#experiences" },
  { label: "Contact", href: "#contact" },
];

export const HERO_HEADLINE: [string, string, string] = [
  "Nature’s",
  "Perfect",
  "Hideaways",
];

export const HERO_STATS: HeroStats = {
  description:
    "Discover handpicked luxury cabins in breathtaking locations. Unplug, unwind, and reconnect with what matters most.",
  rating: 4.7,
  staysCount: "from 1,800+ stays",
};

export const CABIN_BOOKING_DATA: CabinBookingDetails = {
  titleLines: ["Evergreen", "Pine Family Lodge"],
  startDate: "Oct 21",
  endDate: "Oct 24",
  checkInTime: "After 2:00 PM",
  checkOutTime: "Until 12:00 PM",
  pricePerNight: 359,
  nightsCount: 3,
  totalPrice: 1077,
  guestsRange: "2–5 guests",
};
