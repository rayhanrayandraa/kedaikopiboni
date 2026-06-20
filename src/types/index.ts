export type Theme = 'light' | 'dark';

export interface FrameData {
  currentIndex: number;
  isLoaded: boolean;
  loadProgress: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category: 'coffee' | 'non-coffee' | 'food' | 'pastry';
}

export interface Breakpoint {
  MOBILE: number;
  TABLET: number;
  DESKTOP: number;
  WIDE: number;
}

export interface NavLink {
  label: string;
  href: string;
}
