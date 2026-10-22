export interface NavItem {
  label: string;
  href: string;
}

export interface CabinBookingDetails {
  titleLines: [string, string];
  startDate: string;
  endDate: string;
  checkInTime: string;
  checkOutTime: string;
  pricePerNight: number;
  nightsCount: number;
  totalPrice: number;
  guestsRange: string;
}

export interface HeroStats {
  description: string;
  rating: number;
  staysCount: string;
}
