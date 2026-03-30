import { Router, Request, Response } from 'express';
import { PLAZAS } from '../data/plazas';
import { PlazaQueryParams, RouteQueryParams, TollFees } from '../types';

const router = Router();

// ── Haversine helpers ────────────────────────────────────────────────────────

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function pointToSegmentKm(
  pLat: number, pLng: number,
  aLat: number, aLng: number,
  bLat: number, bLng: number
): number {
  const dx = bLng - aLng;
  const dy = bLat - aLat;
  if (dx === 0 && dy === 0) return haversineKm(pLat, pLng, aLat, aLng);
  const t = Math.max(0, Math.min(1,
    ((pLng - aLng) * dx + (pLat - aLat) * dy) / (dx * dx + dy * dy)
  ));
  return haversineKm(pLat, pLng, aLat + t * dy, aLng + t * dx);
}

// ── GET /api/plazas ──────────────────────────────────────────────────────────

router.get('/', (req: Request<object, object, object, PlazaQueryParams>, res: Response) => {
  let results = [...PLAZAS];

  const { state, highway, min_fee, max_fee, search, vehicle_type, limit, offset } = req.query;

  if (state) {
    results = results.filter(p => p.state.toLowerCase() === state.toLowerCase());
  }

  if (highway) {
    results = results.filter(p => p.highway.toLowerCase() === highway.toLowerCase());
  }

  const vt: keyof TollFees = (vehicle_type as keyof TollFees) || 'car_jeep_van';

  if (min_fee) {
    results = results.filter(p => p.fees[vt] >= Number(min_fee));
  }

  if (max_fee) {
    results = results.filter(p => p.fees[vt] <= Number(max_fee));
  }

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.highway.toLowerCase().includes(q) ||
        p.state.toLowerCase().includes(q) ||
        p.district.toLowerCase().includes(q)
    );
  }

  const total = results.length;
  const off = Number(offset) || 0;
  const lim = Number(limit) || 200;
  results = results.slice(off, off + lim);

  res.json({
    total,
    count: results.length,
    offset: off,
    data: results,
  });
});

// ── GET /api/plazas/stats ────────────────────────────────────────────────────

router.get('/stats', (_req, res) => {
  const fees = PLAZAS.map(p => p.fees.car_jeep_van);
  const stateCount: Record<string, number> = {};
  const hwCount: Record<string, number> = {};

  PLAZAS.forEach(p => {
    stateCount[p.state] = (stateCount[p.state] || 0) + 1;
    hwCount[p.highway] = (hwCount[p.highway] || 0) + 1;
  });

  res.json({
    total_plazas: PLAZAS.length,
    unique_states: Object.keys(stateCount).length,
    unique_highways: Object.keys(hwCount).length,
    avg_car_fee: Math.round(fees.reduce((a, b) => a + b, 0) / fees.length),
    max_car_fee: Math.max(...fees),
    min_car_fee: Math.min(...fees),
    state_distribution: Object.entries(stateCount)
      .map(([state, count]) => ({ state, count }))
      .sort((a, b) => b.count - a.count),
    highway_distribution: Object.entries(hwCount)
      .map(([highway, count]) => ({ highway, count }))
      .sort((a, b) => b.count - a.count),
  });
});

// ── GET /api/plazas/route ────────────────────────────────────────────────────

router.get('/route', (req: Request<object, object, object, RouteQueryParams>, res: Response) => {
  const { origin_lat, origin_lng, dest_lat, dest_lng, buffer_km, vehicle_type } = req.query;

  if (!origin_lat || !origin_lng || !dest_lat || !dest_lng) {
    return res.status(400).json({ error: 'origin_lat, origin_lng, dest_lat, dest_lng are required' });
  }

  const oLat = Number(origin_lat);
  const oLng = Number(origin_lng);
  const dLat = Number(dest_lat);
  const dLng = Number(dest_lng);
  const buffer = Number(buffer_km) || 50;
  const vt: keyof TollFees = (vehicle_type as keyof TollFees) || 'car_jeep_van';

  const plazasOnRoute = PLAZAS.filter(
    p => pointToSegmentKm(p.lat, p.lng, oLat, oLng, dLat, dLng) <= buffer
  );

  const totalCost = plazasOnRoute.reduce((s, p) => s + p.fees[vt], 0);
  const distanceKm = Math.round(haversineKm(oLat, oLng, dLat, dLng));

  return res.json({
    origin: { lat: oLat, lng: oLng },
    destination: { lat: dLat, lng: dLng },
    distance_km: distanceKm,
    buffer_km: buffer,
    vehicle_type: vt,
    plaza_count: plazasOnRoute.length,
    total_toll: totalCost,
    plazas: plazasOnRoute,
  });
});

// ── GET /api/plazas/:id ──────────────────────────────────────────────────────

router.get('/:id', (req, res) => {
  const plaza = PLAZAS.find(p => p.id === req.params.id);
  if (!plaza) {
    return res.status(404).json({ error: 'Plaza not found' });
  }
  return res.json(plaza);
});

export default router;
