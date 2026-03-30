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
  direction?: 'both' | 'one-way';
  daily_traffic?: number;
  plaza_type?: 'Main' | 'Ramp' | 'Barrier';
}

export interface PlazaQueryParams {
  state?: string;
  highway?: string;
  min_fee?: string;
  max_fee?: string;
  search?: string;
  vehicle_type?: keyof TollFees;
  limit?: string;
  offset?: string;
}

export interface RouteQueryParams {
  origin_lat: string;
  origin_lng: string;
  dest_lat: string;
  dest_lng: string;
  buffer_km?: string;
  vehicle_type?: keyof TollFees;
}
