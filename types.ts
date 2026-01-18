export interface PropertyLocation {
  ward: string;
  district: string;
  province: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface SellerInfo {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar: string;
  type: 'agent' | 'owner';
}

export interface Property {
  id: string;
  title: string;
  location: PropertyLocation;
  area: number; // m2
  price: number; // VND
  pricePerM2: number;
  listingType: 'sale' | 'rent';
  propertyType: 'land' | 'house' | 'villa' | 'farm';
  images: string[];
  description: string;
  legalStatus: 'so-do' | 'so-hong' | 'dang-cho';
  direction: 'bac' | 'nam' | 'dong' | 'tay' | 'dong-bac' | 'tay-bac' | 'dong-nam' | 'tay-nam';
  roadWidth: number; // meters
  seller: SellerInfo;
  postedDate: string;
  featured: boolean;
  status: 'available' | 'sold';
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  category: 'nghi-duong' | 'dat-nen' | 'kdc';
  location: PropertyLocation;
  totalArea: number; // hectare
  plotCount: number;
  availablePlots: number;
  priceRange: [number, number];
  amenities: string[];
  masterPlan: string;
  gallery: string[];
  legalStatus: string;
  developer: string;
  completionDate: string;
  featured: boolean;
  description: string;
}

export interface PropertyFilters {
  location?: string[];
  priceRange?: [number, number];
  areaRange?: [number, number];
  listingType?: 'sale' | 'rent';
  propertyType?: string[];
  keyword?: string;
  sortBy?: 'price_asc' | 'price_desc' | 'date_desc' | 'area_asc';
  page: number;
  limit: number;
}

export interface NavItem {
  label: string;
  path: string;
  children?: NavItem[];
}