// ── Core plaza type matching actual NHAI TIS data ─────────────────────────
export interface TollPlaza {
  idx: number;          // array index (used as lane reference)
  name: string;
  lat: number;
  lng: number;
  daily_pcu: number;    // Passenger Car Units / day
  lcv_fee: number;      // Light Commercial Vehicle / Mini Bus
  hcm_fee: number;      // Bus / Truck (2-axle) / Heavy Construction Machinery
  mav_fee: number;      // Multi-Axle Vehicle
  car_fee: number;      // Estimated car fee ≈ 0.6 × lcv_fee
  contractor: string;
  is_estimated: boolean; // false = NHAI verified, true = PCU estimated
  contract_type: string; // BOT (Toll) | Public Funded | OMT | HAM | SPV
}

// ── Corridor (lane) between two plazas ─────────────────────────────────────
export interface Lane {
  from: number;   // plaza idx
  to: number;     // plaza idx
  volume: number; // PCU / day on this corridor
}

// ── GIS overlay types ───────────────────────────────────────────────────────
export interface Expressway {
  name: string;
  km: number;
  cost: string;
  status: 'Under Construction' | 'Partially Open' | 'DPR Stage' | 'Planned' | 'Approved' | 'Partially UC';
  year: string;
  color: string;
  path: [number, number][];
}

export interface MMLP {
  name: string;
  lat: number;
  lng: number;
  status: 'Operational' | 'Awarded' | 'Near Complete' | 'Bid Invited' | 'DPR Stage' | 'Approved';
  developer: string;
  acres: number;
  cost: string;
}

export interface GrowthZone {
  name: string;
  lat: number;
  lng: number;
  score: number; // 0–100
  driver: string;
  color: string;
}

// ── Filter / UI state ───────────────────────────────────────────────────────
export interface FilterState {
  minPCU: number;
  laneMode: 'top' | 'all' | 'hot' | 'none';
  overlayMode: 'traffic' | 'expressways' | 'mmlp' | 'growth' | 'all';
  searchQuery: string;
  contractTypes: string[];
}

export type SidebarTab = 'map' | 'growth' | 'data';

export interface RoutePoint {
  lat: number;
  lng: number;
}

export interface RouteState {
  isActive: boolean;
  step: 'idle' | 'picking-origin' | 'picking-destination' | 'complete';
  origin: RoutePoint | null;
  destination: RoutePoint | null;
  plazasOnRoute: TollPlaza[];
  totalLCV: number;
  totalHCM: number;
  totalMAV: number;
  distanceKm: number;
}

export interface AppStats {
  totalPlazas: number;
  verifiedPlazas: number;
  totalDailyPCU: number;
  avgPCU: number;
  maxPCU: number;
  uniqueContractTypes: number;
}
