// ── Vehicle types ───────────────────────────────────────────────────────────
export type VehicleType =
  | 'car_jeep_van'
  | 'lcv_minibus'
  | 'bus_truck'
  | 'multi_axle'
  | 'heavy_construction'
  | 'oversized';

export const VEHICLE_LABELS: Record<VehicleType, string> = {
  car_jeep_van: 'Car / Jeep / Van',
  lcv_minibus: 'LCV / Mini Bus',
  bus_truck: 'Bus / Truck',
  multi_axle: 'Multi-Axle Vehicle',
  heavy_construction: 'Heavy Construction',
  oversized: 'Oversized Vehicle',
};

// ── Core plaza type matching toll plaza data ────────────────────────────────
export interface TollFees {
  car_jeep_van: number;
  lcv_minibus: number;
  bus_truck: number;
  multi_axle: number;
  heavy_construction: number;
  oversized: number;
}

export interface TollPlaza {
  id: string;
  name: string;
  highway: string;
  state: string;
  district: string;
  lat: number;
  lng: number;
  fees: TollFees;
  fees_return?: TollFees;
  three_axle_sj?: number;
  operator?: string;
  concessionaire_type?: string;
  location_km?: string;
  address?: string;
  plaza_type?: string;
}

export type IndiaRegion = 'North' | 'South' | 'East' | 'West' | 'Central' | 'Northeast';

export const STATE_REGION_MAP: Record<string, IndiaRegion> = {
  'Jammu and Kashmir': 'North', 'Ladakh': 'North', 'Himachal Pradesh': 'North',
  'Punjab': 'North', 'Haryana': 'North', 'Uttarakhand': 'North',
  'Uttar Pradesh': 'North', 'Delhi': 'North', 'Rajasthan': 'North',
  'Tamil Nadu': 'South', 'Kerala': 'South', 'Karnataka': 'South',
  'Andhra Pradesh': 'South', 'Telangana': 'South', 'Puducherry': 'South',
  'West Bengal': 'East', 'Odisha': 'East', 'Bihar': 'East', 'Jharkhand': 'East',
  'Maharashtra': 'West', 'Gujarat': 'West', 'Goa': 'West',
  'Madhya Pradesh': 'Central', 'Chhattisgarh': 'Central',
  'Assam': 'Northeast', 'Meghalaya': 'Northeast', 'Manipur': 'Northeast',
  'Mizoram': 'Northeast', 'Nagaland': 'Northeast', 'Tripura': 'Northeast',
  'Arunachal Pradesh': 'Northeast', 'Sikkim': 'Northeast',
};

export type TollSortBy = 'fee_desc' | 'fee_asc' | 'name';

// ── Filter / UI state ───────────────────────────────────────────────────────
export interface FilterState {
  states: string[];
  highways: string[];
  regions: IndiaRegion[];
  minFee: number;
  maxFee: number;
  searchQuery: string;
  vehicleType: VehicleType;
  sortBy: TollSortBy;
  topN: number | null;  // show only top N by fee; null = all
}

export interface RoutePoint {
  lat: number;
  lng: number;
  label?: string;
}

export interface RouteState {
  isActive: boolean;
  step: 'idle' | 'picking-origin' | 'picking-destination' | 'complete';
  origin: RoutePoint | null;
  destination: RoutePoint | null;
  plazasOnRoute: TollPlaza[];
  totalCost: number;
  distanceKm: number;
}

export interface AppStats {
  totalPlazas: number;
  uniqueStates: number;
  uniqueHighways: number;
  avgCarFee: number;
  maxCarFee: number;
  minCarFee: number;
}
