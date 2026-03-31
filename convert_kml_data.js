#!/usr/bin/env node
/**
 * Converts toll_plazas_all_india.json (extracted from KML) into
 * client/src/data/tollPlazas.ts for the React app.
 */
const fs = require('fs');
const path = require('path');

const raw = JSON.parse(fs.readFileSync(
  path.join(__dirname, 'toll_plazas_all_india.json'), 'utf8'
));

function num(v) {
  const n = parseInt(v, 10);
  return isNaN(n) ? 0 : n;
}

function cleanHighway(nh) {
  if (!nh) return 'NH-Unknown';
  const s = nh.toString().trim();
  // Already formatted
  if (s.startsWith('NH-')) return s;
  // "Old 34 New 12" → NH-12
  const newMatch = s.match(/New\s+(\S+)/i);
  if (newMatch) return `NH-${newMatch[1]}`;
  // Pure number
  if (/^\d+/.test(s)) return `NH-${s}`;
  return `NH-${s}`;
}

const plazas = raw.map((p, i) => ({
  id: p.plaza_code ? `P${p.plaza_code}` : `P${i + 1}`,
  name: (p.plaza_name || '').replace(/\n/g, ' ').trim(),
  highway: cleanHighway(p.nh_no),
  state: (p.state || '').trim(),
  district: (p.city || '').trim(),
  lat: parseFloat(p.lat || p.latitude),
  lng: parseFloat(p.long || p.longitude),
  fees: {
    car_jeep_van:      num(p.carjeepvan_sj),
    lcv_minibus:       num(p.lcv_sj),
    bus_truck:         num(p.bustruck_sj),
    multi_axle:        num(p.foursixaxle_sj),
    heavy_construction: num(p.hcm_eme_sj),
    oversized:         num(p.oversized_sj),
  },
  fees_return: {
    car_jeep_van:      num(p.carjeepvan_rj),
    lcv_minibus:       num(p.lcv_rj),
    bus_truck:         num(p.bustruck_rj),
    multi_axle:        num(p.foursixaxle_rj),
    heavy_construction: num(p.hcm_eme_rj),
    oversized:         num(p.oversized_rj),
  },
  monthly_pass: {
    car_jeep_van:  num(p.carjeepvan_mp),
    lcv_minibus:   num(p.lcv_mp),
    bus_truck:     num(p.bustruck_mp),
  },
  three_axle_sj:   num(p.threeaxle_sj),
  operator: (p.concessionaire_name || '').replace(/\n/g, ' ').trim(),
  concessionaire_type: p.concessionaire_type || '',
  location_km: (p.location || '').trim(),
  address: (p.address || '').replace(/\n/g, ' ').trim(),
  plaza_sub_type: p.plaza_sub_type || 'National',
  plaza_type: 'Main',
})).filter(p => !isNaN(p.lat) && !isNaN(p.lng) && p.lat !== 0 && p.lng !== 0);

// Deduplicate by plaza code
const seen = new Set();
const unique = plazas.filter(p => {
  if (seen.has(p.id)) return false;
  seen.add(p.id);
  return true;
});

const states = [...new Set(unique.map(p => p.state))].filter(Boolean).sort();
const highways = [...new Set(unique.map(p => p.highway))].filter(Boolean).sort();

const output = `/**
 * AUTO-GENERATED from All India Toll Plaza.kml
 * ${unique.length} toll plazas across ${states.length} states, ${highways.length} national highways
 * Fees: single journey in ₹ | Source: NHAI FastTag / KML data
 */
import { TollPlaza } from '../types';

export const TOLL_PLAZAS: TollPlaza[] = ${JSON.stringify(unique, null, 2)};

export const INDIA_STATES = ${JSON.stringify(states)};
export const HIGHWAYS = ${JSON.stringify(highways)};
`;

const outPath = path.join(__dirname, 'client/src/data/tollPlazas.ts');
fs.writeFileSync(outPath, output, 'utf8');
const size = (fs.statSync(outPath).size / 1024).toFixed(0);
console.log(`✓ Written ${unique.length} plazas to tollPlazas.ts (${size} KB)`);
console.log(`  States: ${states.length} | Highways: ${highways.length}`);
