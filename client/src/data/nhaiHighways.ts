/**
 * NHAI Bharatmala Phase I & Major Upcoming/Under-Construction Highways
 * Sources: NHAI Annual Report 2024-25, MoRTH project tracker, public data
 */

export interface NHAIHighway {
  id: string;
  name: string;
  nhNumber: string;
  length_km: number;
  status: 'Operational' | 'Under Construction' | 'Awarded' | 'Planning';
  completion_year?: number;
  cost_cr?: number;
  color: string;
  weight?: number;
  dashArray?: string;
  path: [number, number][]; // [lat, lng] waypoints
  description: string;
}

const STATUS_COLORS: Record<NHAIHighway['status'], string> = {
  'Operational':       '#10b981',
  'Under Construction':'#f59e0b',
  'Awarded':           '#3b82f6',
  'Planning':          '#94a3b8',
};

export const NHAI_HIGHWAYS: NHAIHighway[] = [
  {
    id: 'DEL-MUM-EXP', name: 'Delhi–Mumbai Expressway', nhNumber: 'NH-148N',
    length_km: 1386, status: 'Under Construction', completion_year: 2025, cost_cr: 98000,
    color: STATUS_COLORS['Under Construction'], weight: 3,
    path: [[28.65,77.23],[27.49,76.65],[27.20,76.16],[26.91,75.79],[25.83,73.83],[25.35,73.05],[24.58,72.89],[23.89,72.93],[23.20,72.74],[22.31,73.19],[21.74,73.04],[21.17,72.83],[20.55,72.97],[19.85,72.87],[19.23,72.87],[18.96,72.82]],
    description: 'India\'s longest expressway (1,386 km). 8-lane access controlled. Delhi to Mumbai via Jaipur, Vadodara, Surat. Reduces travel to ~12 hours. Cost ₹98,000 Cr.',
  },
  {
    id: 'AMR-JAM-EXP', name: 'Amritsar–Jamnagar Expressway', nhNumber: 'NH-754K',
    length_km: 1257, status: 'Under Construction', completion_year: 2026, cost_cr: 68000,
    color: STATUS_COLORS['Under Construction'], weight: 3,
    path: [[31.63,74.87],[30.90,75.85],[30.21,74.94],[29.15,75.73],[27.90,73.88],[27.09,72.93],[24.62,71.28],[23.00,70.04],[22.47,70.06]],
    description: '6/8-lane. Punjab grain belt to Gujarat ports. Traverses Rajasthan. Integrates WDFC at multiple nodes. Bharatmala Phase I.',
  },
  {
    id: 'DAKE', name: 'Delhi–Amritsar–Katra Expressway', nhNumber: 'NH-44 greenfield',
    length_km: 669, status: 'Under Construction', completion_year: 2026, cost_cr: 39000,
    color: STATUS_COLORS['Under Construction'], weight: 3,
    path: [[28.65,77.23],[29.00,77.08],[29.66,76.99],[30.37,76.78],[30.74,76.78],[31.09,75.97],[31.63,74.87],[32.10,75.01],[32.73,74.87],[32.97,74.54]],
    description: '6-lane. Delhi to Katra (Vaishno Devi) via Chandigarh and Amritsar. J&K strategic corridor. Reduces travel from 13 hrs to ~6 hrs.',
  },
  {
    id: 'DDN-EXP', name: 'Delhi–Dehradun Economic Corridor', nhNumber: 'NH-72A',
    length_km: 212, status: 'Under Construction', completion_year: 2025, cost_cr: 8295,
    color: STATUS_COLORS['Under Construction'], weight: 3,
    path: [[28.65,77.23],[28.88,77.58],[29.21,77.70],[29.58,77.72],[29.97,77.55],[30.32,78.04]],
    description: '6-lane. 12km elevated wildlife section in Rajaji Tiger Reserve. 340m wildlife overpass. Delhi-Dehradun in 2.5 hrs.',
  },
  {
    id: 'CHN-BLR-EXP', name: 'Chennai–Bengaluru Expressway', nhNumber: 'NH-79',
    length_km: 262, status: 'Under Construction', completion_year: 2026, cost_cr: 17930,
    color: STATUS_COLORS['Under Construction'], weight: 3,
    path: [[13.08,80.27],[12.98,79.97],[12.83,79.70],[12.91,79.13],[12.68,78.19],[12.74,77.82],[12.97,77.59]],
    description: '6-lane greenfield. CBIC corridor backbone. Chennai-Bengaluru in ~2.5 hrs. Key for auto + electronics logistics.',
  },
  {
    id: 'HYD-BLR-EXP', name: 'Hyderabad–Bengaluru Economic Corridor', nhNumber: 'NH-44',
    length_km: 576, status: 'Under Construction', completion_year: 2026, cost_cr: 22000,
    color: STATUS_COLORS['Under Construction'], weight: 3,
    path: [[17.38,78.49],[16.83,77.73],[15.14,77.49],[14.47,78.82],[13.78,78.12],[13.34,77.72],[12.97,77.59]],
    description: '6-lane. HBIC corridor. Critical pharma + IT logistics route. Includes Kurnool bypass and Anantapur section.',
  },
  {
    id: 'GANGA-EXP', name: 'Ganga Expressway (UP)', nhNumber: 'State/NH grid',
    length_km: 594, status: 'Under Construction', completion_year: 2025, cost_cr: 36230,
    color: STATUS_COLORS['Under Construction'], weight: 3,
    path: [[29.00,77.68],[28.50,78.40],[27.88,79.10],[27.54,79.81],[27.57,80.20],[26.85,80.95],[26.45,80.35],[25.78,81.60],[25.43,81.85]],
    description: '6-lane. Meerut to Prayagraj. UP government flagship. Integrates AKIC + EDFC freight corridor at multiple nodes.',
  },
  {
    id: 'RAI-VIZ', name: 'Raipur–Visakhapatnam Economic Corridor', nhNumber: 'NH-30/NH-26',
    length_km: 466, status: 'Under Construction', completion_year: 2027, cost_cr: 24000,
    color: STATUS_COLORS['Under Construction'], weight: 3,
    path: [[21.25,81.63],[20.70,82.19],[20.07,82.80],[19.31,83.42],[18.30,83.47],[17.69,83.22]],
    description: '4/6-lane greenfield. Mineral corridor: Chhattisgarh mines → Visakhapatnam port. VCIC anchor.',
  },
  {
    id: 'EPI-RING', name: 'Eastern Peripheral Expressway', nhNumber: 'NH-709B',
    length_km: 135, status: 'Operational', completion_year: 2018, cost_cr: 11000,
    color: STATUS_COLORS['Operational'], weight: 2,
    path: [[28.38,77.34],[28.55,77.51],[28.65,77.87],[28.87,77.65],[29.04,77.52],[28.78,77.50],[29.00,77.23],[28.88,77.08],[28.65,77.23]],
    description: '6-lane. Diverts Delhi through-traffic. Kundli (NH-44) to Palwal (NH-19). 65,000 PCU/day. Integrates with WDFC.',
  },
  {
    id: 'NAG-MUM-SMRIDDHI', name: 'Nagpur–Mumbai Samruddhi Expressway', nhNumber: 'NH-753E',
    length_km: 701, status: 'Operational', completion_year: 2023, cost_cr: 55000,
    color: STATUS_COLORS['Operational'], weight: 3,
    path: [[21.15,79.09],[20.87,78.41],[20.46,77.16],[20.55,76.12],[20.00,75.02],[19.40,74.45],[19.29,73.74],[19.38,73.38],[19.08,72.88]],
    description: '8-lane. Maharashtra Samruddhi Mahamarg. Nagpur–Mumbai. Connects Vidarbha to Mumbai. 24 agri-business nodes. Operational since Dec 2023.',
  },
  {
    id: 'BLR-RING', name: 'Bengaluru Peripheral Ring Road', nhNumber: 'NH-75',
    length_km: 281, status: 'Under Construction', completion_year: 2028, cost_cr: 18500,
    color: STATUS_COLORS['Under Construction'], weight: 2, dashArray: '8 4',
    path: [[13.06,77.42],[13.12,77.59],[13.21,77.72],[13.11,77.92],[12.92,77.98],[12.84,77.67],[12.89,77.46],[13.06,77.42]],
    description: '8-lane ring road around Bengaluru. Decongests city core. Connects all radial highways + logistics parks.',
  },
  {
    id: 'KAN-LKN-EXP', name: 'Kanpur–Lucknow Expressway', nhNumber: 'NH upgrade',
    length_km: 120, status: 'Awarded', completion_year: 2027, cost_cr: 7000,
    color: STATUS_COLORS['Awarded'], weight: 2, dashArray: '6 3',
    path: [[26.45,80.35],[26.60,80.55],[26.85,80.95]],
    description: '6-lane. Reduces Kanpur-Lucknow travel to 45 min. AKIC industrial corridor connectivity.',
  },
  {
    id: 'RRTS-DEL-MRT', name: 'Delhi–Meerut RRTS (Expressway parallel)', nhNumber: 'RRTS',
    length_km: 82, status: 'Under Construction', completion_year: 2025, cost_cr: 30274,
    color: STATUS_COLORS['Under Construction'], weight: 2,
    path: [[28.65,77.23],[28.75,77.33],[28.88,77.40],[29.00,77.55],[29.10,77.62],[29.21,77.70]],
    description: 'India\'s first Regional Rapid Transit System (RRTS). Semi-high speed (180 km/h). Delhi Sarai Kale Khan to Meerut.',
  },
];
