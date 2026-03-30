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
  operator?: string;
  commissioned_year?: number;
  direction?: string;
  daily_traffic?: number;
  plaza_type?: string;
}

// ── Filter / UI state ───────────────────────────────────────────────────────
export interface FilterState {
  states: string[];
  highways: string[];
  minFee: number;
  maxFee: number;
  searchQuery: string;
  vehicleType: VehicleType;
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
