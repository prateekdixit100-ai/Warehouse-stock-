/**
 * India Dedicated Freight Corridors (DFCCIL)
 * + Major Railway Stations
 */

export interface FreightCorridor {
  id: string;
  name: string;
  shortName: string;
  length_km: number;
  status: 'Operational' | 'Under Construction' | 'Planned';
  color: string;
  dashArray?: string;
  path: [number, number][]; // [lat, lng]
  description: string;
}

export interface MajorStation {
  code: string;
  name: string;
  lat: number;
  lng: number;
  zone: string;
  type: 'Junction' | 'Terminal' | 'Port' | 'Hub';
  annual_freight_mt?: number; // million tonnes
  daily_trains?: number;
}

// ── Dedicated Freight Corridors ───────────────────────────────────────────────
export const FREIGHT_CORRIDORS: FreightCorridor[] = [
  {
    id: 'EDFC',
    name: 'Eastern Dedicated Freight Corridor',
    shortName: 'EDFC',
    length_km: 1318,
    status: 'Operational',
    color: '#3b82f6', // blue
    path: [
      [30.90, 75.85], // Ludhiana
      [30.37, 76.78], // Ambala
      [29.96, 77.55], // Saharanpur
      [28.65, 77.87], // Khurja (western junction)
      [27.55, 78.57], // Tundla
      [27.21, 78.01], // Agra
      [27.19, 78.03], // New Bhaupur start
      [26.78, 80.21], // Kanpur New
      [26.45, 80.35], // Kanpur
      [25.88, 81.27], // Rae Bareli
      [25.43, 81.85], // Prayagraj
      [25.29, 83.00], // DDU / Varanasi area
      [25.14, 83.38], // Pt. Deen Dayal Upadhyay Jn
      [24.70, 84.07], // Sonnagar
    ],
    description: 'Ludhiana → Sonnagar. 1,318 km. Operational since 2022. Connects Punjab to Bihar. Serves GRFL, FCI, coal, fertilizer traffic.',
  },
  {
    id: 'WDFC',
    name: 'Western Dedicated Freight Corridor',
    shortName: 'WDFC',
    length_km: 1504,
    status: 'Operational',
    color: '#10b981', // green
    path: [
      [18.95, 72.95], // JNPT Mumbai
      [19.35, 72.83], // Vasai
      [19.75, 72.96], // Vapi
      [21.17, 72.83], // Surat
      [21.69, 72.83], // Bharuch
      [22.31, 73.19], // Vadodara
      [22.86, 72.95], // Anand
      [23.03, 72.59], // Ahmedabad
      [23.47, 72.51], // Gandhinagar
      [24.17, 72.43], // Palanpur
      [24.88, 72.73], // Abu Road
      [25.17, 73.72], // Marwar
      [26.45, 74.64], // Ajmer
      [26.87, 75.24], // Phulera
      [27.21, 75.79], // Ringas
      [28.00, 76.32], // Narnaul
      [28.20, 76.62], // Rewari
      [28.55, 77.55], // Dadri / Greater Noida
    ],
    description: 'JNPT Mumbai → Dadri (Greater Noida). 1,504 km. Operational since 2022. Serves container traffic between ports and industrial hinterland.',
  },
  {
    id: 'EPDFC',
    name: 'East-West DFC (Proposed)',
    shortName: 'E-W DFC',
    length_km: 2328,
    status: 'Planned',
    color: '#a855f7', // purple
    dashArray: '6 4',
    path: [
      [22.57, 88.36], // Kolkata
      [23.74, 86.42], // Asansol
      [24.42, 84.90], // Gaya
      [25.43, 81.85], // Prayagraj
      [26.45, 80.35], // Kanpur
      [27.17, 78.01], // Agra
      [26.91, 75.79], // Jaipur
      [23.03, 72.59], // Ahmedabad
      [21.17, 72.83], // Surat
      [19.08, 72.88], // Mumbai
    ],
    description: 'Kolkata → Mumbai. ~2,328 km. Phase II – under survey. Will connect eastern coalfields and ports to western industrial hubs.',
  },
  {
    id: 'NSDFC',
    name: 'North-South DFC (Proposed)',
    shortName: 'N-S DFC',
    length_km: 2173,
    status: 'Planned',
    color: '#f97316', // orange
    dashArray: '6 4',
    path: [
      [30.90, 75.85], // Ludhiana
      [28.65, 77.23], // Delhi
      [27.17, 78.01], // Agra
      [25.43, 81.85], // Prayagraj
      [23.26, 77.41], // Bhopal
      [21.15, 79.09], // Nagpur (zero mile)
      [19.08, 72.88], // Mumbai junction?
      [17.38, 78.49], // Hyderabad
      [14.47, 78.82], // Cuddapah
      [13.08, 80.27], // Chennai
      [11.02, 76.96], // Coimbatore (South end)
    ],
    description: 'Shreenathpuram → Vijayawada (Phase II concept). ~2,173 km. Proposed to link Punjab to South India through MP and Telangana.',
  },
];

// ── Major Railway Stations (Top 40) ──────────────────────────────────────────
export const MAJOR_STATIONS: MajorStation[] = [
  { code: 'NDLS', name: 'New Delhi', lat: 28.6431, lng: 77.2198, zone: 'NR',  type: 'Hub',      daily_trains: 450 },
  { code: 'CSTM', name: 'Mumbai CSMT', lat: 18.9399, lng: 72.8355, zone: 'CR', type: 'Terminal', daily_trains: 380 },
  { code: 'HWH',  name: 'Howrah', lat: 22.5847, lng: 88.3425, zone: 'ER',  type: 'Hub',      daily_trains: 350 },
  { code: 'MAS',  name: 'Chennai Central', lat: 13.0827, lng: 80.2707, zone: 'SR', type: 'Hub', daily_trains: 280 },
  { code: 'SBC',  name: 'Bengaluru City', lat: 12.9779, lng: 77.5720, zone: 'SWR', type: 'Hub', daily_trains: 260 },
  { code: 'SC',   name: 'Secunderabad', lat: 17.4346, lng: 78.5005, zone: 'SCR', type: 'Hub',  daily_trains: 240 },
  { code: 'CNB',  name: 'Kanpur Central', lat: 26.4518, lng: 80.3512, zone: 'NCR', type: 'Junction', daily_trains: 180 },
  { code: 'PNBE', name: 'Patna Jn', lat: 25.6105, lng: 85.1667, zone: 'ECR', type: 'Hub',     daily_trains: 150 },
  { code: 'LKO',  name: 'Lucknow NR', lat: 26.8467, lng: 80.9462, zone: 'NR',  type: 'Hub',   daily_trains: 160 },
  { code: 'ADI',  name: 'Ahmedabad', lat: 23.0204, lng: 72.5991, zone: 'WR',  type: 'Hub',    daily_trains: 180 },
  { code: 'JP',   name: 'Jaipur', lat: 26.9163, lng: 75.7886, zone: 'NWR', type: 'Hub',       daily_trains: 140 },
  { code: 'PUNE', name: 'Pune Jn', lat: 18.5247, lng: 73.8753, zone: 'CR',  type: 'Hub',      daily_trains: 160 },
  { code: 'NGP',  name: 'Nagpur', lat: 21.1458, lng: 79.0882, zone: 'SECR', type: 'Junction', daily_trains: 200, annual_freight_mt: 8 },
  { code: 'BPL',  name: 'Bhopal Jn', lat: 23.2600, lng: 77.4126, zone: 'WCR', type: 'Hub',   daily_trains: 120 },
  { code: 'VSKP', name: 'Visakhapatnam', lat: 17.6868, lng: 83.2185, zone: 'ECoR', type: 'Port', daily_trains: 110, annual_freight_mt: 12 },
  { code: 'GHY',  name: 'Guwahati', lat: 26.1880, lng: 91.7458, zone: 'NFR', type: 'Hub',    daily_trains: 90 },
  { code: 'UDZ',  name: 'Udaipur City', lat: 24.5942, lng: 73.6806, zone: 'NWR', type: 'Junction', daily_trains: 40 },
  { code: 'INDB', name: 'Indore Jn', lat: 22.7188, lng: 75.8636, zone: 'WR',  type: 'Hub',   daily_trains: 60 },
  { code: 'DURG', name: 'Durg', lat: 21.1895, lng: 81.2831, zone: 'SECR', type: 'Junction',  daily_trains: 70, annual_freight_mt: 10 },
  { code: 'R',    name: 'Raipur', lat: 21.2336, lng: 81.6314, zone: 'SECR', type: 'Hub',     daily_trains: 80, annual_freight_mt: 9 },
  { code: 'TVC',  name: 'Thiruvananthapuram', lat: 8.4948, lng: 76.9490, zone: 'SR',  type: 'Terminal', daily_trains: 70 },
  { code: 'ERS',  name: 'Ernakulam', lat: 9.9816, lng: 76.2998, zone: 'SR',  type: 'Hub',    daily_trains: 90 },
  { code: 'CBE',  name: 'Coimbatore', lat: 11.0015, lng: 76.9643, zone: 'SR',  type: 'Hub',  daily_trains: 80 },
  { code: 'MDU',  name: 'Madurai Jn', lat: 9.9195, lng: 78.1231, zone: 'SR',  type: 'Hub',   daily_trains: 70 },
  { code: 'DLI',  name: 'Old Delhi', lat: 28.6560, lng: 77.2130, zone: 'NR',  type: 'Junction', daily_trains: 250 },
  { code: 'GZB',  name: 'Ghaziabad', lat: 28.6540, lng: 77.4190, zone: 'NR',  type: 'Junction', daily_trains: 190 },
  { code: 'DHN',  name: 'Dhanbad', lat: 23.7994, lng: 86.4302, zone: 'ECR', type: 'Junction', daily_trains: 120, annual_freight_mt: 20 },
  { code: 'TATA', name: 'Tatanagar (Jamshedpur)', lat: 22.7925, lng: 86.1754, zone: 'SER', type: 'Hub', daily_trains: 90, annual_freight_mt: 15 },
  { code: 'BBS',  name: 'Bhubaneswar', lat: 20.2669, lng: 85.8380, zone: 'ECoR', type: 'Hub', daily_trains: 80 },
  { code: 'PURI', name: 'Puri', lat: 19.8014, lng: 85.8203, zone: 'ECoR', type: 'Terminal', daily_trains: 40 },
  { code: 'JAT',  name: 'Jammu Tawi', lat: 32.7266, lng: 74.8570, zone: 'NR',  type: 'Terminal', daily_trains: 50 },
  { code: 'ASR',  name: 'Amritsar', lat: 31.6340, lng: 74.8776, zone: 'NR',  type: 'Hub',   daily_trains: 80 },
  { code: 'CDG',  name: 'Chandigarh', lat: 30.7433, lng: 76.7789, zone: 'NR',  type: 'Terminal', daily_trains: 60 },
  { code: 'LDH',  name: 'Ludhiana', lat: 30.9010, lng: 75.8573, zone: 'NR',  type: 'Hub',   daily_trains: 90, annual_freight_mt: 5 },
  { code: 'DDN',  name: 'Dehradun', lat: 30.3165, lng: 78.0322, zone: 'NR',  type: 'Terminal', daily_trains: 30 },
  { code: 'UMB',  name: 'Ambala', lat: 30.3783, lng: 76.7766, zone: 'NR',  type: 'Junction', daily_trains: 120 },
  { code: 'NDKN', name: 'Narkatiaganj (EDFC hub)', lat: 27.0976, lng: 84.4748, zone: 'ECR', type: 'Hub', annual_freight_mt: 6 },
  { code: 'MGSI', name: 'Pt. DDU Jn (Mughal Sarai)', lat: 25.2800, lng: 83.1190, zone: 'ECR', type: 'Junction', daily_trains: 200 },
  { code: 'BSB',  name: 'Varanasi City', lat: 25.3176, lng: 82.9739, zone: 'NR',  type: 'Hub', daily_trains: 90 },
  { code: 'AGC',  name: 'Agra Cantt', lat: 27.1527, lng: 77.9775, zone: 'NCR', type: 'Junction', daily_trains: 100 },
];
