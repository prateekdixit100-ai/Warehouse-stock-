/**
 * Colliers India – Emerging Industrial & Warehousing Corridors
 * "Mapping the Next Growth Frontier" — February 2026 (37 pages)
 * Source: prateekdixit100-ai/Warehouse-stock- (Colliers warehousing hotspots 30.pdf)
 */

export type WarehouseCluster = 'PRIME' | 'EMERGING' | 'NASCENT';

export interface WarehouseHotspot {
  id: string;
  name: string;
  cluster: WarehouseCluster;
  region: 'North' | 'South' | 'East' | 'West' | 'Central';
  lat: number;
  lng: number;
  // Market metrics (top 8 cities only; null = not published)
  rental_min?: number;   // INR/sq ft/month
  rental_max?: number;
  vacancy_pct?: number;
  absorption_2025_msf?: number;  // million sq ft leased in 2025
  supply_2025_msf?: number;      // new Grade A supply in 2025
  demand_drivers: string[];
  key_infra: string[];
}

export interface IndustrialCorridor {
  id: string;
  name: string;
  shortName: string;
  states: string[];
  cities: string[];
  status: 'Operational' | 'Advanced' | 'Under Development' | 'Planning' | 'Conceptual';
  color: string;
  path: [number, number][];  // [lat, lng]
}

export interface MMLP {
  name: string;
  lat: number;
  lng: number;
  budget_cr: number;
  status: 'Approved' | 'Planned';
}

// ── 30 Warehousing Hotspot Cities ─────────────────────────────────────────

export const WAREHOUSE_HOTSPOTS: WarehouseHotspot[] = [
  // PRIME HUBS (8)
  {
    id: 'WH-DEL', name: 'Delhi NCR', cluster: 'PRIME', region: 'North',
    lat: 28.67, lng: 77.22,
    rental_min: 27, rental_max: 50, vacancy_pct: 12.7,
    absorption_2025_msf: 8.8, supply_2025_msf: 12.4,
    demand_drivers: ['3PL', 'E-Commerce', 'FMCG'],
    key_infra: ['DMIC', 'AKIC', 'Jewar Airport', 'EDFC+WDFC', 'Greater Noida Smart City'],
  },
  {
    id: 'WH-CHN', name: 'Chennai', cluster: 'PRIME', region: 'South',
    lat: 13.08, lng: 80.27,
    rental_min: 20, rental_max: 40, vacancy_pct: 22.2,
    absorption_2025_msf: 8.1, supply_2025_msf: 8.0,
    demand_drivers: ['Engineering', '3PL', 'Automobile'],
    key_infra: ['CBIC', 'VCIC', 'Parandur Airport', 'MMLP ₹1,423 Cr', 'Kamarajar Port'],
  },
  {
    id: 'WH-BLR', name: 'Bengaluru', cluster: 'PRIME', region: 'South',
    lat: 12.97, lng: 77.59,
    rental_min: 20, rental_max: 45, vacancy_pct: 22.1,
    absorption_2025_msf: 3.5, supply_2025_msf: 3.2,
    demand_drivers: ['Engineering', 'Automobile', 'Retail'],
    key_infra: ['CBIC', 'HBIC', 'BMIC', 'Tumakuru Smart City', 'MMLP ₹1,769 Cr'],
  },
  {
    id: 'WH-MUM', name: 'Mumbai', cluster: 'PRIME', region: 'West',
    lat: 19.08, lng: 72.88,
    rental_min: 32, rental_max: 50, vacancy_pct: 18.6,
    absorption_2025_msf: 4.9, supply_2025_msf: 6.1,
    demand_drivers: ['3PL', 'E-Commerce', 'FMCG'],
    key_infra: ['DMIC', 'BMIC', 'Navi Mumbai Airport', 'JNPT', 'Vadhavan Port'],
  },
  {
    id: 'WH-PUN', name: 'Pune', cluster: 'PRIME', region: 'West',
    lat: 18.52, lng: 73.86,
    rental_min: 15, rental_max: 20, vacancy_pct: 4.6,
    absorption_2025_msf: 4.8, supply_2025_msf: 4.6,
    demand_drivers: ['Engineering', '3PL', 'Automobile'],
    key_infra: ['BMIC', 'Purandar Airport', 'Dighi Port'],
  },
  {
    id: 'WH-HYD', name: 'Hyderabad', cluster: 'PRIME', region: 'South',
    lat: 17.38, lng: 78.49,
    rental_min: 15, rental_max: 27, vacancy_pct: 14.7,
    absorption_2025_msf: 2.4, supply_2025_msf: 2.1,
    demand_drivers: ['3PL', 'Engineering', 'E-Commerce'],
    key_infra: ['HNIC', 'HWIC', 'HBIC', 'Zaheerabad Smart City'],
  },
  {
    id: 'WH-KOL', name: 'Kolkata', cluster: 'PRIME', region: 'East',
    lat: 22.57, lng: 88.36,
    rental_min: 12, rental_max: 30, vacancy_pct: 7.1,
    absorption_2025_msf: 2.5, supply_2025_msf: 3.1,
    demand_drivers: ['3PL', 'E-Commerce', 'FMCG'],
    key_infra: ['AKIC', 'EDFC', 'Kalyani Airport', 'Haldia Port'],
  },
  {
    id: 'WH-AMD', name: 'Ahmedabad', cluster: 'PRIME', region: 'West',
    lat: 23.03, lng: 72.59,
    rental_min: 13, rental_max: 27, vacancy_pct: 12.6,
    absorption_2025_msf: 1.9, supply_2025_msf: 2.2,
    demand_drivers: ['3PL', 'FMCG', 'Automobile'],
    key_infra: ['DMIC', 'Dholera Smart City', 'Dholera Airport', 'WDFC'],
  },
  // EMERGING HUBS (12)
  {
    id: 'WH-IND', name: 'Indore', cluster: 'EMERGING', region: 'Central',
    lat: 22.72, lng: 75.86,
    demand_drivers: ['3PL', 'FMCG', 'Textile'],
    key_infra: ['DNIC corridor', 'MMLP ₹1,110 Cr', 'Dhar PM MITRA'],
  },
  {
    id: 'WH-JAI', name: 'Jaipur', cluster: 'EMERGING', region: 'North',
    lat: 26.91, lng: 75.79,
    demand_drivers: ['3PL', 'E-Commerce', 'FMCG'],
    key_infra: ['DMIC', 'WDFC', 'Jodhpur-Pali Smart City'],
  },
  {
    id: 'WH-LKN', name: 'Lucknow', cluster: 'EMERGING', region: 'North',
    lat: 26.85, lng: 80.95,
    demand_drivers: ['3PL', 'E-Commerce', 'Textile'],
    key_infra: ['AKIC', 'EDFC', 'PM MITRA Textile Park'],
  },
  {
    id: 'WH-SRT', name: 'Surat', cluster: 'EMERGING', region: 'West',
    lat: 21.17, lng: 72.83,
    demand_drivers: ['Textile', '3PL', 'E-Commerce'],
    key_infra: ['DMIC', 'WDFC', 'EWDFC', 'Hazira Port', 'Navsari PM MITRA'],
  },
  {
    id: 'WH-NSK', name: 'Nashik', cluster: 'EMERGING', region: 'West',
    lat: 20.00, lng: 73.79,
    demand_drivers: ['Engineering', '3PL', 'E-Commerce'],
    key_infra: ['DMIC', 'BMIC'],
  },
  {
    id: 'WH-VIZ', name: 'Visakhapatnam', cluster: 'EMERGING', region: 'South',
    lat: 17.69, lng: 83.22,
    demand_drivers: ['Manufacturing', '3PL', 'Engineering'],
    key_infra: ['VCIC', 'Bhogapuram Airport', 'Krishnapatnam Port', 'ECDFC'],
  },
  {
    id: 'WH-COI', name: 'Coimbatore', cluster: 'EMERGING', region: 'South',
    lat: 11.02, lng: 76.96,
    demand_drivers: ['Engineering', 'Textile', '3PL'],
    key_infra: ['Ext. CBIC-Kochi corridor'],
  },
  {
    id: 'WH-KOC', name: 'Kochi', cluster: 'EMERGING', region: 'South',
    lat: 9.93, lng: 76.27,
    demand_drivers: ['3PL', 'Retail', 'Cold Chain'],
    key_infra: ['Ext. CBIC-Kochi', 'Palakkad Smart City', 'Cochin Port'],
  },
  {
    id: 'WH-BHO', name: 'Bhopal', cluster: 'EMERGING', region: 'Central',
    lat: 23.26, lng: 77.41,
    demand_drivers: ['3PL', 'FMCG'],
    key_infra: ['DNIC corridor', 'MMLP planned'],
  },
  {
    id: 'WH-BHU', name: 'Bhubaneswar', cluster: 'EMERGING', region: 'East',
    lat: 20.30, lng: 85.85,
    demand_drivers: ['3PL', 'Manufacturing'],
    key_infra: ['OEC', 'Paradip Port', 'Dhamra Port'],
  },
  {
    id: 'WH-PAT', name: 'Patna', cluster: 'EMERGING', region: 'East',
    lat: 25.59, lng: 85.14,
    demand_drivers: ['3PL', 'FMCG', 'E-Commerce'],
    key_infra: ['AKIC', 'EDFC', 'Gaya Smart City'],
  },
  {
    id: 'WH-RAJ', name: 'Rajpura', cluster: 'EMERGING', region: 'North',
    lat: 30.49, lng: 76.59,
    demand_drivers: ['Manufacturing', '3PL', 'Engineering'],
    key_infra: ['AKIC', 'Rajpura-Patiala Smart City'],
  },
  // NASCENT HUBS (10)
  {
    id: 'WH-NAG', name: 'Nagpur', cluster: 'NASCENT', region: 'West',
    lat: 21.15, lng: 79.09,
    demand_drivers: ['3PL', 'Manufacturing', 'E-Commerce'],
    key_infra: ['DNIC', 'HNIC', 'MMLP ₹693 Cr', 'Zero-mile city'],
  },
  {
    id: 'WH-GUW', name: 'Guwahati', cluster: 'NASCENT', region: 'East',
    lat: 26.18, lng: 91.74,
    demand_drivers: ['3PL', 'FMCG', 'Cold Chain'],
    key_infra: ['Jogighopa MMLP ₹673 Cr', 'NE connectivity'],
  },
  {
    id: 'WH-KAN', name: 'Kanpur', cluster: 'NASCENT', region: 'North',
    lat: 26.46, lng: 80.35,
    demand_drivers: ['Leather', '3PL', 'E-Commerce'],
    key_infra: ['AKIC', 'EDFC', 'Lucknow expressway'],
  },
  {
    id: 'WH-PRA', name: 'Prayagraj', cluster: 'NASCENT', region: 'North',
    lat: 25.43, lng: 81.85,
    demand_drivers: ['3PL', 'FMCG', 'E-Commerce'],
    key_infra: ['AKIC', 'EDFC', 'Prayagraj Smart City'],
  },
  {
    id: 'WH-RAI', name: 'Raipur', cluster: 'NASCENT', region: 'Central',
    lat: 21.25, lng: 81.63,
    demand_drivers: ['Steel', '3PL', 'FMCG'],
    key_infra: ['OEC corridor', 'EDFC connectivity'],
  },
  {
    id: 'WH-JAM', name: 'Jammu', cluster: 'NASCENT', region: 'North',
    lat: 32.73, lng: 74.87,
    demand_drivers: ['3PL', 'FMCG'],
    key_infra: ['NH-44', 'MMLP planned'],
  },
  {
    id: 'WH-JMS', name: 'Jamshedpur', cluster: 'NASCENT', region: 'East',
    lat: 22.80, lng: 86.18,
    demand_drivers: ['Steel', 'Engineering', '3PL'],
    key_infra: ['OEC corridor', 'EDFC proximity'],
  },
  {
    id: 'WH-HOS', name: 'Hosur', cluster: 'NASCENT', region: 'South',
    lat: 12.74, lng: 77.82,
    demand_drivers: ['EV/Electronics', 'Engineering', '3PL'],
    key_infra: ['CBIC', 'Bengaluru proximity'],
  },
  {
    id: 'WH-AMR', name: 'Amravati', cluster: 'NASCENT', region: 'West',
    lat: 20.93, lng: 77.75,
    demand_drivers: ['Textile', 'Manufacturing'],
    key_infra: ['HNIC', 'PM MITRA Park', 'Nagpur spillover'],
  },
  {
    id: 'WH-VIJ', name: 'Vijayawada', cluster: 'NASCENT', region: 'South',
    lat: 16.51, lng: 80.62,
    demand_drivers: ['3PL', 'E-Commerce', 'Manufacturing'],
    key_infra: ['VCIC', 'ECDFC', 'Krishna riverport'],
  },
];

// ── National Industrial Corridors ──────────────────────────────────────────

export const INDUSTRIAL_CORRIDORS: IndustrialCorridor[] = [
  {
    id: 'DMIC', name: 'Delhi–Mumbai Industrial Corridor', shortName: 'DMIC',
    states: ['Delhi', 'Haryana', 'Rajasthan', 'Madhya Pradesh', 'Gujarat', 'Maharashtra'],
    cities: ['Delhi NCR', 'Jaipur', 'Ahmedabad', 'Mumbai'],
    status: 'Advanced',
    color: '#3b82f6',
    path: [[28.67,77.22],[26.91,75.79],[23.03,72.59],[21.17,72.83],[19.08,72.88]],
  },
  {
    id: 'AKIC', name: 'Amritsar–Kolkata Industrial Corridor', shortName: 'AKIC',
    states: ['Punjab', 'Haryana', 'UP', 'Bihar', 'West Bengal'],
    cities: ['Rajpura', 'Delhi NCR', 'Lucknow', 'Kanpur', 'Patna', 'Kolkata'],
    status: 'Under Development',
    color: '#f59e0b',
    path: [[31.63,74.87],[30.49,76.59],[28.67,77.22],[26.85,80.95],[26.46,80.35],[25.59,85.14],[22.57,88.36]],
  },
  {
    id: 'CBIC', name: 'Chennai–Bengaluru Industrial Corridor', shortName: 'CBIC',
    states: ['Tamil Nadu', 'Karnataka', 'Andhra Pradesh'],
    cities: ['Chennai', 'Hosur', 'Bengaluru'],
    status: 'Advanced',
    color: '#10b981',
    path: [[13.08,80.27],[12.74,77.82],[12.97,77.59]],
  },
  {
    id: 'VCIC', name: 'Visakhapatnam–Chennai Industrial Corridor', shortName: 'VCIC',
    states: ['Andhra Pradesh', 'Tamil Nadu'],
    cities: ['Visakhapatnam', 'Vijayawada', 'Chennai'],
    status: 'Advanced',
    color: '#8b5cf6',
    path: [[17.69,83.22],[16.51,80.62],[14.25,80.10],[13.08,80.27]],
  },
  {
    id: 'HBIC', name: 'Hyderabad–Bengaluru Industrial Corridor', shortName: 'HBIC',
    states: ['Telangana', 'Karnataka'],
    cities: ['Hyderabad', 'Bengaluru'],
    status: 'Under Development',
    color: '#ec4899',
    path: [[17.38,78.49],[15.33,76.82],[12.97,77.59]],
  },
  {
    id: 'BMIC', name: 'Bengaluru–Mumbai Industrial Corridor', shortName: 'BMIC',
    states: ['Karnataka', 'Maharashtra'],
    cities: ['Bengaluru', 'Pune', 'Mumbai'],
    status: 'Planning',
    color: '#f97316',
    path: [[12.97,77.59],[15.85,74.49],[18.52,73.86],[19.08,72.88]],
  },
  {
    id: 'HNIC', name: 'Hyderabad–Nagpur Industrial Corridor', shortName: 'HNIC',
    states: ['Telangana', 'Maharashtra'],
    cities: ['Hyderabad', 'Nagpur', 'Amravati'],
    status: 'Planning',
    color: '#ef4444',
    path: [[17.38,78.49],[19.07,79.40],[21.15,79.09],[20.93,77.75]],
  },
  {
    id: 'DNIC', name: 'Delhi–Nagpur Industrial Corridor', shortName: 'DNIC',
    states: ['Delhi', 'Madhya Pradesh', 'Maharashtra'],
    cities: ['Delhi NCR', 'Bhopal', 'Indore', 'Nagpur'],
    status: 'Planning',
    color: '#94a3b8',
    path: [[28.67,77.22],[23.26,77.41],[22.72,75.86],[21.15,79.09]],
  },
];

// ── MMLPs sanctioned under PM GatiShakti ──────────────────────────────────

export const COLLIERS_MMLPS: MMLP[] = [
  { name: 'Bengaluru MMLP', lat: 12.90, lng: 77.65, budget_cr: 1769, status: 'Approved' },
  { name: 'Chennai MMLP', lat: 12.95, lng: 80.10, budget_cr: 1423, status: 'Approved' },
  { name: 'Indore MMLP', lat: 22.71, lng: 75.92, budget_cr: 1110, status: 'Approved' },
  { name: 'Nagpur MMLP', lat: 21.10, lng: 79.15, budget_cr: 693, status: 'Approved' },
  { name: 'Jogighopa (Guwahati) MMLP', lat: 26.17, lng: 91.60, budget_cr: 673, status: 'Approved' },
];

// ── Summary stats ──────────────────────────────────────────────────────────

export const COLLIERS_SUMMARY = {
  totalHotspots: 30,
  prime: 8,
  emerging: 12,
  nascent: 10,
  totalGradeAStock_msf: 300,
  totalAbsorption2025_msf: 36.9,
  totalSupply2025_msf: 41.7,
  corridors: INDUSTRIAL_CORRIDORS.length,
  mmlpsApproved: COLLIERS_MMLPS.length,
  reportDate: 'February 2026',
};

export const CLUSTER_COLORS: Record<WarehouseCluster, string> = {
  PRIME: '#f59e0b',
  EMERGING: '#3b82f6',
  NASCENT: '#94a3b8',
};

export const CLUSTER_SIZES: Record<WarehouseCluster, number> = {
  PRIME: 10,
  EMERGING: 7,
  NASCENT: 5,
};
