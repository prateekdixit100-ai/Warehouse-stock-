/**
 * MP Landband – Madhya Pradesh Investment & Logistics Corridor Data
 * Source: invest.mp.gov.in/wp-content/uploads/2025/02/Landband-_draft_02_23-feb.pdf
 *
 * Includes the four state investment corridors, MPIDC logistics parks,
 * economic zones, industrial areas, and DMIC alignment through MP.
 */

// ── Types ──────────────────────────────────────────────────────────────────

export interface LandbandCorridor {
  id: string;
  name: string;
  type: 'investment' | 'dmic' | 'expressway' | 'industrial';
  lengthKm: number;
  investment: string;
  status: 'Operational' | 'Under Development' | 'Planned' | 'Approved';
  color: string;
  width: number;       // polyline weight
  path: [number, number][];  // [lat, lng] waypoints
  description: string;
}

export interface LandbandHub {
  id: string;
  name: string;
  type: 'logistics_park' | 'mmlp' | 'sez' | 'industrial_area' | 'economic_zone' | 'icd' | 'warehouse_cluster';
  lat: number;
  lng: number;
  city: string;
  district: string;
  areaAcres?: number;
  investment?: string;
  status: 'Operational' | 'Under Construction' | 'Approved' | 'Planned';
  developer?: string;
  description: string;
  highlights?: string[];
}

// ── Investment Corridors ───────────────────────────────────────────────────

export const LANDBAND_CORRIDORS: LandbandCorridor[] = [
  {
    id: 'C1',
    name: 'Bhopal–Indore Investment Corridor',
    type: 'investment',
    lengthKm: 200,
    investment: '₹25,000 Cr',
    status: 'Under Development',
    color: '#f59e0b',
    width: 4,
    path: [
      [23.26, 77.41],  // Bhopal
      [23.16, 77.52],  // Obedullaganj (NH-46)
      [22.96, 76.84],  // Sehore
      [22.96, 76.05],  // Dewas
      [22.72, 75.86],  // Indore
    ],
    description: 'Primary investment corridor linking Madhya Pradesh\'s two largest cities via NH-46. Hosts Pithampur-Dhar-Mhow auto cluster, Dewas industrial area, and proposed economic zones. 255-acre model logistics park at Acharpura.',
  },
  {
    id: 'C2',
    name: 'Bhopal–Bina Investment Corridor',
    type: 'investment',
    lengthKm: 140,
    investment: '₹12,000 Cr',
    status: 'Approved',
    color: '#10b981',
    width: 4,
    path: [
      [23.26, 77.41],  // Bhopal
      [23.34, 77.64],  // Raisen
      [23.81, 78.00],  // Ganj Basoda
      [24.18, 78.14],  // Bina
    ],
    description: 'Corridor along NH-146 connecting Bhopal to Bina refinery-industrial cluster. Key node for petroleum, chemicals, and downstream industries leveraging BPCL Bina Refinery.',
  },
  {
    id: 'C3',
    name: 'Jabalpur–Katni–Satna–Singrauli Corridor',
    type: 'investment',
    lengthKm: 340,
    investment: '₹18,000 Cr',
    status: 'Under Development',
    color: '#8b5cf6',
    width: 4,
    path: [
      [23.18, 79.99],  // Jabalpur
      [23.83, 80.40],  // Katni (NH-30)
      [24.59, 80.83],  // Satna
      [24.22, 82.20],  // Singrauli (energy corridor)
    ],
    description: 'Eastern energy and minerals corridor connecting Jabalpur to Singrauli coal belt via NH-30. Includes cement, coal, and power plant supply chains. Key logistics hubs at Katni and Satna.',
  },
  {
    id: 'C4',
    name: 'Morena–Gwalior–Shivpuri–Guna Corridor',
    type: 'investment',
    lengthKm: 260,
    investment: '₹15,000 Cr',
    status: 'Approved',
    color: '#ef4444',
    width: 4,
    path: [
      [26.50, 77.90],  // Morena
      [26.22, 78.18],  // Gwalior
      [25.97, 78.05],  // Dabra
      [25.42, 77.65],  // Shivpuri
      [24.65, 77.32],  // Guna
    ],
    description: 'Northern corridor along NH-3 (Agra-Mumbai Highway) connecting Chambal region to Guna. Key industries: chemicals (Gwalior), textiles, agro-processing. Logistics park at Shivpuri operational.',
  },
  {
    id: 'C5',
    name: 'Delhi–Mumbai Industrial Corridor (DMIC) — MP Segment',
    type: 'dmic',
    lengthKm: 380,
    investment: '₹1,20,000 Cr (national)',
    status: 'Under Development',
    color: '#3b82f6',
    width: 5,
    path: [
      [26.22, 78.18],  // Gwalior
      [25.42, 77.65],  // Shivpuri
      [24.65, 77.32],  // Guna
      [24.47, 77.02],  // Ashok Nagar
      [23.47, 76.25],  // Shajapur
      [22.96, 76.05],  // Dewas
      [22.72, 75.86],  // Indore (AURIC node)
      [22.62, 75.70],  // Pithampur (NIMZ)
    ],
    description: 'Delhi–Mumbai Industrial Corridor passes through western MP. Includes Pithampur–Dhar–Mhow National Investment & Manufacturing Zone (NIMZ) and Shivpuri Logistics Park. Ratlam–Nagda and Shajapur–Dewas are key DMIC nodes.',
  },
  {
    id: 'C6',
    name: 'Atal Progressway Economic Corridor',
    type: 'expressway',
    lengthKm: 464,
    investment: '₹20,000 Cr',
    status: 'Planned',
    color: '#f97316',
    width: 3,
    path: [
      [26.22, 78.18],  // Gwalior
      [25.42, 77.65],  // Shivpuri
      [24.65, 77.32],  // Guna
      [23.84, 77.03],  // Rajgarh
      [23.26, 77.41],  // Bhopal
      [22.88, 76.62],  // Sehore (south)
      [22.72, 75.86],  // Indore
    ],
    description: '464 km greenfield expressway — Atal Progressway — connecting Gwalior to Indore through Bhopal. Planned 2,000 Ha of Industrial Growth Centers alongside. Phase 1 DPR approved.',
  },
  {
    id: 'C7',
    name: 'Indore–Pithampur–Dhar Economic Zone',
    type: 'industrial',
    lengthKm: 35,
    investment: '₹8,500 Cr',
    status: 'Operational',
    color: '#14b8a6',
    width: 3,
    path: [
      [22.72, 75.86],  // Indore
      [22.66, 75.77],  // Sanwer
      [22.62, 75.70],  // Pithampur
      [22.60, 75.30],  // Dhar
    ],
    description: 'Operational 3,200-acre economic corridor on the Indore–Pithampur stretch using MP Land Pooling Act. Anchor: Pithampur auto-cluster with 300+ auto-component firms. Includes Crystal IT Park and SEZ Pithampur.',
  },
];

// ── Logistics Hubs & Industrial Nodes ─────────────────────────────────────

export const LANDBAND_HUBS: LandbandHub[] = [
  // ── Bhopal-Indore Corridor ──
  {
    id: 'H01',
    name: 'Pithampur NIMZ / Auto Cluster',
    type: 'industrial_area',
    lat: 22.62, lng: 75.70,
    city: 'Pithampur', district: 'Dhar',
    areaAcres: 4600,
    investment: '₹6,200 Cr',
    status: 'Operational',
    developer: 'MPIDC / Central Govt',
    description: 'National Investment & Manufacturing Zone. 300+ auto-component manufacturers. Anchor: Force Motors, Eicher, Minda group.',
    highlights: ['NIMZ Status', 'SEZ Pithampur', '300+ units', 'Auto cluster'],
  },
  {
    id: 'H02',
    name: 'Dewas Industrial Area',
    type: 'industrial_area',
    lat: 22.96, lng: 76.05,
    city: 'Dewas', district: 'Dewas',
    areaAcres: 3200,
    investment: '₹4,100 Cr',
    status: 'Operational',
    developer: 'MPIDC',
    description: 'Major industrial node on Bhopal-Indore corridor. Pharma, textiles, auto parts. Key employers: Procter & Gamble, Ecopack.',
    highlights: ['Pharma hub', 'Textiles', 'Shajapur-Dewas DMIC node'],
  },
  {
    id: 'H03',
    name: 'Indore Multi-Modal Logistics Park',
    type: 'mmlp',
    lat: 22.71, lng: 75.92,
    city: 'Indore', district: 'Indore',
    areaAcres: 350,
    investment: '₹900 Cr',
    status: 'Approved',
    developer: 'NLCIL / MPIDC',
    description: 'MMLP under PM GatiShakti scheme. Rail-road-air multimodal hub near Indore airport. Will handle 15 MT/year cargo.',
    highlights: ['PM GatiShakti', 'Rail-road-air', '15 MT/yr'],
  },
  {
    id: 'H04',
    name: 'Acharpura Logistics & Model Park',
    type: 'logistics_park',
    lat: 23.32, lng: 77.38,
    city: 'Bhopal', district: 'Bhopal',
    areaAcres: 255,
    investment: '₹450 Cr',
    status: 'Under Construction',
    developer: 'MPIDC',
    description: 'Model logistics park at Acharpura near Bhopal. Special education zone anchor. 255-acre integrated park with warehousing, cold chain, and last-mile distribution.',
    highlights: ['Model logistics park', '255 acres', 'Cold chain', 'Education zone'],
  },
  {
    id: 'H05',
    name: 'Bagrauda Industrial Cluster',
    type: 'industrial_area',
    lat: 23.21, lng: 77.29,
    city: 'Bhopal', district: 'Bhopal',
    areaAcres: 800,
    investment: '₹1,200 Cr',
    status: 'Under Construction',
    developer: 'MPIDC',
    description: 'Auto and electronics cluster near Bhopal. Anchor investor: major automobile OEM. Small-scale units for ancillary manufacturing.',
    highlights: ['Auto OEM anchor', 'Electronics', 'NH-12 access'],
  },
  // ── Bhopal–Bina Corridor ──
  {
    id: 'H06',
    name: 'Bina Refinery Industrial Zone',
    type: 'industrial_area',
    lat: 24.18, lng: 78.14,
    city: 'Bina', district: 'Sagar',
    areaAcres: 1500,
    investment: '₹8,000 Cr',
    status: 'Operational',
    developer: 'BPCL / MPIDC',
    description: 'BPCL Bina Refinery (6 MMTPA) industrial cluster. Petrochemical downstream, plastics, rubber industries. Rail ICD at Bina junction.',
    highlights: ['BPCL 6 MMTPA refinery', 'ICD Bina', 'Petrochemicals'],
  },
  {
    id: 'H07',
    name: 'Sagar Inland Container Depot',
    type: 'icd',
    lat: 23.84, lng: 78.74,
    city: 'Sagar', district: 'Sagar',
    areaAcres: 120,
    investment: '₹220 Cr',
    status: 'Operational',
    developer: 'CONCOR',
    description: 'CONCOR ICD at Sagar for dry cargo handling. Rail connectivity to JNPT and Mundra ports. Customs bonded warehouse.',
    highlights: ['CONCOR ICD', 'Rail to JNPT', 'Customs bonded'],
  },
  // ── Jabalpur–Singrauli Corridor ──
  {
    id: 'H08',
    name: 'Jabalpur MMLP & ICD',
    type: 'mmlp',
    lat: 23.18, lng: 79.99,
    city: 'Jabalpur', district: 'Jabalpur',
    areaAcres: 280,
    investment: '₹750 Cr',
    status: 'Approved',
    developer: 'NLCIL / CONCOR',
    description: 'Multi-modal logistics park and ICD at Jabalpur. Gateway for Vidarbha-Chhattisgarh mineral cargo. NH-30 and Central Railway junction.',
    highlights: ['PM GatiShakti MMLP', 'Central Railway', 'Mineral corridor'],
  },
  {
    id: 'H09',
    name: 'Katni Cement & Minerals Hub',
    type: 'warehouse_cluster',
    lat: 23.83, lng: 80.40,
    city: 'Katni', district: 'Katni',
    areaAcres: 400,
    investment: '₹600 Cr',
    status: 'Operational',
    developer: 'Private / MPIDC',
    description: 'Cement and limestone mineral hub. Major plants: UltraTech, ACC, JK Cement. Road-rail connectivity for dispatch to North India.',
    highlights: ['UltraTech', 'ACC', 'JK Cement', 'Rail dispatch'],
  },
  {
    id: 'H10',
    name: 'Singrauli Energy Logistics Hub',
    type: 'warehouse_cluster',
    lat: 24.20, lng: 82.67,
    city: 'Singrauli', district: 'Singrauli',
    areaAcres: 650,
    investment: '₹3,200 Cr',
    status: 'Operational',
    developer: 'NTPC / Private',
    description: 'Mega coal and energy logistics hub. NTPC Vindhyachal (4,760 MW) and Sasan Ultra Mega Power Plant. Coal handling terminals and dedicated freight movement.',
    highlights: ['NTPC 4,760 MW', 'Sasan UMPP 3,960 MW', 'Coal corridor', 'SECL mines'],
  },
  // ── Gwalior–Guna Corridor ──
  {
    id: 'H11',
    name: 'Gwalior Logistics Park',
    type: 'logistics_park',
    lat: 26.22, lng: 78.18,
    city: 'Gwalior', district: 'Gwalior',
    areaAcres: 200,
    investment: '₹380 Cr',
    status: 'Operational',
    developer: 'MPIDC',
    description: 'Gwalior logistics park on NH-3 (Agra-Mumbai Highway). Gateway to NCR markets. Warehousing for FMCG, pharma, auto parts.',
    highlights: ['NH-3 access', 'NCR proximity', 'FMCG hub'],
  },
  {
    id: 'H12',
    name: 'Shivpuri Logistics Park',
    type: 'logistics_park',
    lat: 25.42, lng: 77.65,
    city: 'Shivpuri', district: 'Shivpuri',
    areaAcres: 150,
    investment: '₹280 Cr',
    status: 'Operational',
    developer: 'MPIDC',
    description: 'Operational logistics park on NH-3. Agro-processing and cold storage for Chambal region produce. First-mile aggregation hub.',
    highlights: ['Agro-processing', 'Cold storage', 'NH-3 DMIC node'],
  },
  {
    id: 'H13',
    name: 'Morena Agro Industrial Zone',
    type: 'economic_zone',
    lat: 26.50, lng: 77.90,
    city: 'Morena', district: 'Morena',
    areaAcres: 950,
    investment: '₹1,400 Cr',
    status: 'Under Construction',
    developer: 'MPIDC',
    description: 'Agro and food processing zone in Chambal region. Anchor: mustard oil, sugar, and dairy processing. ICD for export of agricultural commodities.',
    highlights: ['Agro processing', 'Chambal region', 'Mustard/dairy exports'],
  },
  // ── DMIC Nodes ──
  {
    id: 'H14',
    name: 'Ratlam–Nagda Industrial Node (DMIC)',
    type: 'economic_zone',
    lat: 23.33, lng: 75.04,
    city: 'Ratlam', district: 'Ratlam',
    areaAcres: 2800,
    investment: '₹5,500 Cr',
    status: 'Approved',
    developer: 'DMIC Trust / MPIDC',
    description: 'DMIC investment region: Ratlam-Nagda. Chemical, pharma, textiles industries. Nagda: largest caustic soda plant in India (Grasim).',
    highlights: ['Grasim caustic soda', 'DMIC node', 'Pharma cluster'],
  },
  {
    id: 'H15',
    name: 'Neemach–Nayagaon DMIC Node',
    type: 'economic_zone',
    lat: 24.47, lng: 74.88,
    city: 'Neemach', district: 'Neemach',
    areaAcres: 1800,
    investment: '₹2,800 Cr',
    status: 'Planned',
    developer: 'DMIC Trust / MPIDC',
    description: 'Pharma and API (Active Pharmaceutical Ingredient) cluster along DMIC. Proximity to Rajasthan pharma hubs.',
    highlights: ['Pharma API', 'DMIC', 'Border trade Rajasthan'],
  },
  {
    id: 'H16',
    name: 'Crystal IT Park (Indore)',
    type: 'sez',
    lat: 22.74, lng: 75.88,
    city: 'Indore', district: 'Indore',
    areaAcres: 35,
    investment: '₹320 Cr',
    status: 'Operational',
    developer: 'MPIDC',
    description: 'IT-ITeS SEZ in Indore. Major tenants: TCS, Infosys, Wipro. 18,000+ IT professionals. Adjacent to Super Corridor.',
    highlights: ['TCS', 'Infosys', 'Wipro', '18,000+ professionals'],
  },
  {
    id: 'H17',
    name: 'Vikram Udyogpuri Industrial Estate (Ujjain)',
    type: 'industrial_area',
    lat: 23.18, lng: 75.78,
    city: 'Ujjain', district: 'Ujjain',
    areaAcres: 1200,
    investment: '₹1,800 Cr',
    status: 'Operational',
    developer: 'MPIDC',
    description: 'Major industrial estate near Ujjain. Engineering, auto ancillaries, plastics. Railway siding for direct dispatch.',
    highlights: ['Auto ancillaries', 'Engineering', 'Railway siding'],
  },
  {
    id: 'H18',
    name: 'Plastic Park Tamot',
    type: 'industrial_area',
    lat: 23.07, lng: 77.96,
    city: 'Tamot', district: 'Raisen',
    areaAcres: 200,
    investment: '₹280 Cr',
    status: 'Operational',
    developer: 'CIPET / MPIDC',
    description: 'Dedicated Plastic Park at Tamot with CIPET center. 100+ plastic processing units. Serves auto OEMs in Bhopal corridor.',
    highlights: ['CIPET center', '100+ units', 'Auto plastics'],
  },
  {
    id: 'H19',
    name: 'Satna Cement Logistics Hub',
    type: 'warehouse_cluster',
    lat: 24.59, lng: 80.83,
    city: 'Satna', district: 'Satna',
    areaAcres: 350,
    investment: '₹520 Cr',
    status: 'Operational',
    developer: 'Private / MPIDC',
    description: 'World\'s largest cement belt — Satna-Katni-Rewa triangle. Plants: Ultratech, Prism, ACC, Century. Handles 20+ MT cement/year dispatch.',
    highlights: ['World\'s largest cement belt', '20+ MT/yr', 'Ultratech / Prism / ACC'],
  },
  {
    id: 'H20',
    name: 'Rewa Ultra Mega Solar + Logistics',
    type: 'economic_zone',
    lat: 24.54, lng: 81.30,
    city: 'Rewa', district: 'Rewa',
    areaAcres: 1500,
    investment: '₹4,600 Cr',
    status: 'Operational',
    developer: 'RRECL / MPIDC',
    description: '750 MW Rewa Ultra Mega Solar Park — Asia\'s largest single-site solar project. Powers Delhi Metro. Logistics corridor for solar equipment and maintenance.',
    highlights: ['750 MW solar', 'Delhi Metro supply', 'Asia\'s largest (at launch)'],
  },
];

// ── Summary statistics ─────────────────────────────────────────────────────

export const LANDBAND_SUMMARY = {
  corridors: LANDBAND_CORRIDORS.length,
  hubs: LANDBAND_HUBS.length,
  totalCorridorKm: LANDBAND_CORRIDORS.reduce((s, c) => s + c.lengthKm, 0),
  totalInvestment: '₹1,20,000+ Cr',
  operationalHubs: LANDBAND_HUBS.filter(h => h.status === 'Operational').length,
  states: 1,
  districts: 18,
};

export const HUB_TYPE_LABELS: Record<LandbandHub['type'], string> = {
  logistics_park: 'Logistics Park',
  mmlp: 'Multi-Modal LP',
  sez: 'SEZ / IT Park',
  industrial_area: 'Industrial Area',
  economic_zone: 'Economic Zone',
  icd: 'ICD / Rail Depot',
  warehouse_cluster: 'Warehouse Cluster',
};

export const HUB_TYPE_COLORS: Record<LandbandHub['type'], string> = {
  logistics_park: '#3b82f6',
  mmlp: '#8b5cf6',
  sez: '#06b6d4',
  industrial_area: '#f59e0b',
  economic_zone: '#10b981',
  icd: '#f97316',
  warehouse_cluster: '#ec4899',
};

export const CORRIDOR_STATUS_COLORS: Record<LandbandCorridor['status'], string> = {
  Operational: '#10b981',
  'Under Development': '#f59e0b',
  Planned: '#94a3b8',
  Approved: '#3b82f6',
};
