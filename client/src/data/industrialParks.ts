/**
 * Key Industrial Parks & Logistics Parks across India
 * Approximate polygon boundaries for GIS overlay.
 * Sources: GIDC, MIDC, APIIC, TSIIC, KIADB, SIDCO public data
 */

export type ParkType =
  | 'SEZ'          // Special Economic Zone
  | 'MMLP'         // Multi-Modal Logistics Park
  | 'ICD'          // Inland Container Depot
  | 'PM_MITRA'     // PM MITRA Textile Park
  | 'INDUSTRIAL'   // General Industrial Area/Estate
  | 'LOGISTICS'    // Private Logistics/Warehousing Park
  | 'SMART_CITY';  // Smart City Industrial Node

export type ParkStatus = 'Operational' | 'Under Development' | 'Approved' | 'Proposed';

export interface IndustrialPark {
  id: string;
  name: string;
  type: ParkType;
  status: ParkStatus;
  state: string;
  city: string;
  area_ha?: number;
  investment_cr?: number;
  developer?: string;
  description?: string;
  // Center point for pin marker
  lat: number;
  lng: number;
  // Approximate polygon (4–8 points enough for display)
  polygon?: [number, number][]; // [lat, lng]
}

export const PARK_TYPE_COLORS: Record<ParkType, string> = {
  SEZ:        '#f59e0b',
  MMLP:       '#a855f7',
  ICD:        '#06b6d4',
  PM_MITRA:   '#ec4899',
  INDUSTRIAL: '#64748b',
  LOGISTICS:  '#3b82f6',
  SMART_CITY: '#10b981',
};

export const PARK_TYPE_LABELS: Record<ParkType, string> = {
  SEZ:        'Special Economic Zone',
  MMLP:       'Multi-Modal Logistics Park',
  ICD:        'Inland Container Depot',
  PM_MITRA:   'PM MITRA Textile Park',
  INDUSTRIAL: 'Industrial Estate / Area',
  LOGISTICS:  'Logistics / Warehousing Park',
  SMART_CITY: 'Smart City Industrial Node',
};

export const PARK_STATUS_COLORS: Record<ParkStatus, string> = {
  'Operational':       '#10b981',
  'Under Development': '#f59e0b',
  'Approved':          '#3b82f6',
  'Proposed':          '#94a3b8',
};

export const INDUSTRIAL_PARKS: IndustrialPark[] = [
  // ── MMLP (PM GatiShakti) ──────────────────────────────────────────────────
  {
    id: 'MMLP-BLR', name: 'MMLP Bengaluru (Dongur)', type: 'MMLP', status: 'Under Development',
    state: 'Karnataka', city: 'Bengaluru', investment_cr: 1769, developer: 'NHIDCL/NWR',
    description: 'PM GatiShakti MMLP. 317 acres. Rail + road + warehousing integration. Near Tumakuru NH.',
    lat: 13.18, lng: 77.48,
    polygon: [[13.196, 77.462],[13.196, 77.498],[13.164, 77.498],[13.164, 77.462],[13.196, 77.462]],
  },
  {
    id: 'MMLP-CHN', name: 'MMLP Chennai (Mappedu)', type: 'MMLP', status: 'Under Development',
    state: 'Tamil Nadu', city: 'Chennai', investment_cr: 1423, developer: 'NHIDCL',
    description: 'PM GatiShakti MMLP. 231 acres. Near Parandur airport corridor.',
    lat: 13.19, lng: 79.98,
    polygon: [[13.206, 79.963],[13.206, 79.997],[13.174, 79.997],[13.174, 79.963],[13.206, 79.963]],
  },
  {
    id: 'MMLP-IND', name: 'MMLP Indore (Nemawar Rd)', type: 'MMLP', status: 'Under Development',
    state: 'Madhya Pradesh', city: 'Indore', investment_cr: 1110, developer: 'NHIDCL',
    description: 'PM GatiShakti MMLP. 290 acres. Serves DMIC + Dhar PM MITRA. Rail siding planned.',
    lat: 22.65, lng: 75.72,
    polygon: [[22.665, 75.700],[22.665, 75.740],[22.635, 75.740],[22.635, 75.700],[22.665, 75.700]],
  },
  {
    id: 'MMLP-NAG', name: 'MMLP Nagpur (Wardha Rd)', type: 'MMLP', status: 'Under Development',
    state: 'Maharashtra', city: 'Nagpur', investment_cr: 693, developer: 'NHIDCL',
    description: 'PM GatiShakti MMLP. 317 acres. Zero-mile city. Connects DNIC + HNIC corridors.',
    lat: 21.10, lng: 79.22,
    polygon: [[21.115, 79.200],[21.115, 79.240],[21.085, 79.240],[21.085, 79.200],[21.115, 79.200]],
  },
  {
    id: 'MMLP-GUW', name: 'MMLP Guwahati (Jogighopa)', type: 'MMLP', status: 'Under Development',
    state: 'Assam', city: 'Guwahati', investment_cr: 673, developer: 'NHIDCL',
    description: 'PM GatiShakti MMLP. Gateway to Northeast India. IWT + rail + road integration.',
    lat: 26.22, lng: 91.61,
    polygon: [[26.235, 91.590],[26.235, 91.630],[26.205, 91.630],[26.205, 91.590],[26.235, 91.590]],
  },

  // ── PM MITRA Textile Parks ────────────────────────────────────────────────
  {
    id: 'MITRA-DHR', name: 'PM MITRA Dhar (Pithampur)', type: 'PM_MITRA', status: 'Under Development',
    state: 'Madhya Pradesh', city: 'Dhar', area_ha: 1000, investment_cr: 1500,
    description: '₹1,500 Cr PM MITRA Textile Park. Pithampur Industrial Area. Integrated with Indore MMLP.',
    lat: 22.61, lng: 75.68,
    polygon: [[22.625, 75.660],[22.625, 75.700],[22.595, 75.700],[22.595, 75.660],[22.625, 75.660]],
  },
  {
    id: 'MITRA-NAV', name: 'PM MITRA Navsari (Surat)', type: 'PM_MITRA', status: 'Under Development',
    state: 'Gujarat', city: 'Navsari', area_ha: 1000, investment_cr: 1500,
    description: 'PM MITRA Textile Park in Navsari, near Surat textile cluster.',
    lat: 20.97, lng: 72.88,
    polygon: [[20.985, 72.860],[20.985, 72.900],[20.955, 72.900],[20.955, 72.860],[20.985, 72.860]],
  },
  {
    id: 'MITRA-LKN', name: 'PM MITRA Lucknow (Lakhimpur)', type: 'PM_MITRA', status: 'Under Development',
    state: 'Uttar Pradesh', city: 'Lucknow', area_ha: 1000,
    description: 'PM MITRA Textile Park. AKIC corridor. Serves UP textile SMEs.',
    lat: 27.94, lng: 80.78,
    polygon: [[27.955, 80.760],[27.955, 80.800],[27.925, 80.800],[27.925, 80.760],[27.955, 80.760]],
  },
  {
    id: 'MITRA-AMR', name: 'PM MITRA Amravati', type: 'PM_MITRA', status: 'Approved',
    state: 'Maharashtra', city: 'Amravati', area_ha: 1000,
    description: 'PM MITRA Textile Park. HNIC corridor node.',
    lat: 20.95, lng: 77.78,
    polygon: [[20.965, 77.760],[20.965, 77.800],[20.935, 77.800],[20.935, 77.760],[20.965, 77.760]],
  },

  // ── Major Industrial Areas ────────────────────────────────────────────────
  {
    id: 'IND-ORG', name: 'Oragadam Industrial Corridor', type: 'INDUSTRIAL', status: 'Operational',
    state: 'Tamil Nadu', city: 'Chennai', area_ha: 5000, developer: 'TIDCO/SIPCOT',
    description: 'Major auto hub: Renault-Nissan, Komatsu, Daimler, Apollo Tyres. 250+ companies, 200,000+ jobs.',
    lat: 12.82, lng: 79.98,
    polygon: [[12.845, 79.950],[12.845, 80.010],[12.795, 80.010],[12.795, 79.950],[12.845, 79.950]],
  },
  {
    id: 'IND-CHK', name: 'Chakan-Talegaon Industrial Belt', type: 'INDUSTRIAL', status: 'Operational',
    state: 'Maharashtra', city: 'Pune', area_ha: 3000, developer: 'MIDC',
    description: 'Auto + engineering hub: Volkswagen, Bajaj, JCB, Mahindra. Pune\'s prime industrial node.',
    lat: 18.77, lng: 73.86,
    polygon: [[18.795, 73.830],[18.795, 73.890],[18.745, 73.890],[18.745, 73.830],[18.795, 73.830]],
  },
  {
    id: 'IND-SNR', name: 'Sriperumbudur Industrial Area', type: 'INDUSTRIAL', status: 'Operational',
    state: 'Tamil Nadu', city: 'Chennai', area_ha: 2500, developer: 'SIPCOT',
    description: 'Electronics + auto: Hyundai, Samsung, Nokia, Dell, Flextronics. CBIC corridor node.',
    lat: 12.97, lng: 79.97,
    polygon: [[12.990, 79.945],[12.990, 79.995],[12.950, 79.995],[12.950, 79.945],[12.990, 79.945]],
  },
  {
    id: 'IND-MNS', name: 'Manesar Industrial Model Township', type: 'INDUSTRIAL', status: 'Operational',
    state: 'Haryana', city: 'Gurugram', area_ha: 1800, developer: 'HSIIDC',
    description: 'Auto hub: Maruti Suzuki, Honda, Bajaj, Hero. DMIC node.',
    lat: 28.36, lng: 76.94,
    polygon: [[28.380, 76.910],[28.380, 76.970],[28.340, 76.970],[28.340, 76.910],[28.380, 76.910]],
  },
  {
    id: 'IND-PTH', name: 'Pithampur Industrial Area (Sector 1–3)', type: 'INDUSTRIAL', status: 'Operational',
    state: 'Madhya Pradesh', city: 'Indore', area_ha: 3200, developer: 'MPIDC',
    description: 'MP\'s largest industrial area. Auto + pharma: Eicher, Force Motors, Cipla. DNIC corridor.',
    lat: 22.62, lng: 75.69,
    polygon: [[22.650, 75.660],[22.650, 75.720],[22.590, 75.720],[22.590, 75.660],[22.650, 75.660]],
  },
  {
    id: 'IND-HOS', name: 'Hosur Industrial Area', type: 'INDUSTRIAL', status: 'Operational',
    state: 'Tamil Nadu', city: 'Hosur', area_ha: 4000, developer: 'SIDCO/SIPCOT',
    description: 'EV + electronics: Tata Motors EV, TVS, Titan, Hyundai Auto. CBIC node near Bengaluru.',
    lat: 12.74, lng: 77.84,
    polygon: [[12.760, 77.810],[12.760, 77.870],[12.720, 77.870],[12.720, 77.810],[12.760, 77.810]],
  },
  {
    id: 'IND-PWD', name: 'Panvel-Taloja MIDC', type: 'INDUSTRIAL', status: 'Operational',
    state: 'Maharashtra', city: 'Mumbai', area_ha: 2800, developer: 'MIDC',
    description: 'Chemicals, engineering, warehousing. BMIC corridor node. Near Nhava Sheva Port.',
    lat: 18.99, lng: 73.11,
    polygon: [[19.010, 73.080],[19.010, 73.140],[18.970, 73.140],[18.970, 73.080],[19.010, 73.080]],
  },
  {
    id: 'IND-DHL', name: 'Dholera Smart City SIR', type: 'SMART_CITY', status: 'Under Development',
    state: 'Gujarat', city: 'Dholera', area_ha: 90000, developer: 'GIDB/DAIPL',
    description: 'India\'s largest greenfield Smart City. 920 km² DMIC node. Airport + metro + industrial.',
    lat: 22.30, lng: 72.22,
    polygon: [[22.450, 72.000],[22.450, 72.500],[22.150, 72.500],[22.150, 72.000],[22.450, 72.000]],
  },

  // ── ICDs ──────────────────────────────────────────────────────────────────
  {
    id: 'ICD-TKD', name: 'ICD Tughlakabad (Delhi)', type: 'ICD', status: 'Operational',
    state: 'Delhi', city: 'Delhi', developer: 'CONCOR',
    description: 'India\'s busiest ICD. 800+ TEU/day. Rail connected to JNPT, Mundra, Chennai.',
    lat: 28.52, lng: 77.27,
    polygon: [[28.530, 77.255],[28.530, 77.285],[28.510, 77.285],[28.510, 77.255],[28.530, 77.255]],
  },
  {
    id: 'ICD-KKD', name: 'ICD Kanakpura (Jaipur)', type: 'ICD', status: 'Operational',
    state: 'Rajasthan', city: 'Jaipur', developer: 'CONCOR',
    description: 'Serves Jaipur gems/handicrafts export. WDFC rail link.',
    lat: 26.97, lng: 75.74,
    polygon: [[26.980, 75.720],[26.980, 75.760],[26.960, 75.760],[26.960, 75.720],[26.980, 75.720]],
  },
  {
    id: 'ICD-PNE', name: 'ICD Pune (Talegaon)', type: 'ICD', status: 'Operational',
    state: 'Maharashtra', city: 'Pune', developer: 'CONCOR',
    description: 'Serves Pune auto belt exports. Rail link to JNPT.',
    lat: 18.73, lng: 73.68,
    polygon: [[18.740, 73.660],[18.740, 73.700],[18.720, 73.700],[18.720, 73.660],[18.740, 73.660]],
  },

  // ── SEZs ──────────────────────────────────────────────────────────────────
  {
    id: 'SEZ-MND', name: 'Mundra SEZ / APSEZ', type: 'SEZ', status: 'Operational',
    state: 'Gujarat', city: 'Mundra', area_ha: 10000, developer: 'Adani Group',
    description: 'India\'s largest private port + SEZ. 150+ MT cargo/year. WDFC rail head.',
    lat: 22.84, lng: 69.72,
    polygon: [[22.890, 69.660],[22.890, 69.780],[22.790, 69.780],[22.790, 69.660],[22.890, 69.660]],
  },
  {
    id: 'SEZ-NHV', name: 'Nhava Sheva SEZ', type: 'SEZ', status: 'Operational',
    state: 'Maharashtra', city: 'Mumbai', developer: 'JNPT',
    description: 'Adjacent to JNPT — India\'s largest container port. 5.8 MT TEU/year.',
    lat: 18.95, lng: 72.96,
    polygon: [[18.975, 72.930],[18.975, 72.990],[18.925, 72.990],[18.925, 72.930],[18.975, 72.930]],
  },
  {
    id: 'SEZ-NOI', name: 'NSEZ Noida', type: 'SEZ', status: 'Operational',
    state: 'Uttar Pradesh', city: 'Noida', developer: 'NSEZ Ltd',
    description: 'Noida SEZ — IT, electronics, gems & jewellery exports.',
    lat: 28.58, lng: 77.34,
    polygon: [[28.595, 77.320],[28.595, 77.360],[28.565, 77.360],[28.565, 77.320],[28.595, 77.320]],
  },
];
