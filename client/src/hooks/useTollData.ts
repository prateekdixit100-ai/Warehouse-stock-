import { useMemo, useState, useEffect } from 'react';
import { FilterState, TollPlaza, AppStats, VehicleType, STATE_REGION_MAP } from '../types';

const DEFAULT_FILTERS: FilterState = {
  states: [],
  highways: [],
  regions: [],
  minFee: 0,
  maxFee: 2000,
  searchQuery: '',
  vehicleType: 'car_jeep_van',
  sortBy: 'fee_desc',
  topN: null,
};

export function useTollData() {
  const [allPlazas, setAllPlazas] = useState<TollPlaza[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  useEffect(() => {
    fetch('/data/toll-plazas.json')
      .then(r => r.json())
      .then((data: TollPlaza[]) => { setAllPlazas(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const availableStates = useMemo(
    () => [...new Set(allPlazas.map(p => p.state))].filter(Boolean).sort(),
    [allPlazas]
  );
  const availableHighways = useMemo(
    () => [...new Set(allPlazas.map(p => p.highway))].filter(Boolean).sort(),
    [allPlazas]
  );

  const filteredPlazas = useMemo((): TollPlaza[] => {
    let result = allPlazas.filter(plaza => {
      if (filters.states.length > 0 && !filters.states.includes(plaza.state)) return false;
      if (filters.highways.length > 0 && !filters.highways.includes(plaza.highway)) return false;
      if (filters.regions.length > 0) {
        const region = STATE_REGION_MAP[plaza.state];
        if (!region || !filters.regions.includes(region)) return false;
      }
      const fee = plaza.fees[filters.vehicleType];
      if (fee < filters.minFee || fee > filters.maxFee) return false;
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        if (
          !plaza.name.toLowerCase().includes(q) &&
          !plaza.highway.toLowerCase().includes(q) &&
          !plaza.state.toLowerCase().includes(q) &&
          !(plaza.district || '').toLowerCase().includes(q)
        ) return false;
      }
      return true;
    });
    // Sort
    if (filters.sortBy === 'fee_desc') result = [...result].sort((a, b) => b.fees[filters.vehicleType] - a.fees[filters.vehicleType]);
    else if (filters.sortBy === 'fee_asc') result = [...result].sort((a, b) => a.fees[filters.vehicleType] - b.fees[filters.vehicleType]);
    else result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    // Top N
    if (filters.topN !== null) result = result.slice(0, filters.topN);
    return result;
  }, [allPlazas, filters]);

  const stats = useMemo((): AppStats => {
    if (allPlazas.length === 0)
      return { totalPlazas: 0, uniqueStates: 0, uniqueHighways: 0, avgCarFee: 0, maxCarFee: 0, minCarFee: 0 };
    const fees = allPlazas.map(p => p.fees.car_jeep_van).filter(f => f > 0);
    return {
      totalPlazas: allPlazas.length,
      uniqueStates: new Set(allPlazas.map(p => p.state)).size,
      uniqueHighways: new Set(allPlazas.map(p => p.highway)).size,
      avgCarFee: fees.length ? Math.round(fees.reduce((a, b) => a + b, 0) / fees.length) : 0,
      maxCarFee: fees.length ? Math.max(...fees) : 0,
      minCarFee: fees.length ? Math.min(...fees) : 0,
    };
  }, [allPlazas]);

  const stateDistribution = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredPlazas.forEach(p => { counts[p.state] = (counts[p.state] || 0) + 1; });
    return Object.entries(counts).map(([state, count]) => ({ state, count }))
      .sort((a, b) => b.count - a.count).slice(0, 12);
  }, [filteredPlazas]);

  const highwayDistribution = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredPlazas.forEach(p => { counts[p.highway] = (counts[p.highway] || 0) + 1; });
    return Object.entries(counts).map(([highway, count]) => ({ highway, count }))
      .sort((a, b) => b.count - a.count).slice(0, 10);
  }, [filteredPlazas]);

  const feeDistribution = useMemo(() => {
    const buckets: Record<string, number> = {
      '< ₹70': 0, '₹70–100': 0, '₹100–150': 0, '₹150–200': 0, '> ₹200': 0,
    };
    filteredPlazas.forEach(p => {
      const fee = p.fees[filters.vehicleType];
      if (fee < 70) buckets['< ₹70']++;
      else if (fee < 100) buckets['₹70–100']++;
      else if (fee < 150) buckets['₹100–150']++;
      else if (fee < 200) buckets['₹150–200']++;
      else buckets['> ₹200']++;
    });
    return Object.entries(buckets).map(([range, count]) => ({ range, count }));
  }, [filteredPlazas, filters.vehicleType]);

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };
  const resetFilters = () => setFilters(DEFAULT_FILTERS);
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.states.length > 0) count++;
    if (filters.highways.length > 0) count++;
    if (filters.regions.length > 0) count++;
    if (filters.minFee > 0 || filters.maxFee < 2000) count++;
    if (filters.searchQuery) count++;
    if (filters.topN !== null) count++;
    return count;
  }, [filters]);

  return {
    allPlazas, filteredPlazas, filters, updateFilter, resetFilters,
    activeFilterCount, stats, stateDistribution, highwayDistribution,
    feeDistribution, availableStates, availableHighways, loading,
  };
}

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function pointToSegmentDistanceKm(pLat: number, pLng: number, aLat: number, aLng: number, bLat: number, bLng: number): number {
  const dx = bLng - aLng, dy = bLat - aLat;
  if (dx === 0 && dy === 0) return haversineKm(pLat, pLng, aLat, aLng);
  const t = Math.max(0, Math.min(1, ((pLng - aLng) * dx + (pLat - aLat) * dy) / (dx * dx + dy * dy)));
  return haversineKm(pLat, pLng, aLat + t * dy, aLng + t * dx);
}

export function getPlazasNearRoute(plazas: TollPlaza[], origin: [number, number], destination: [number, number], bufferKm = 50): TollPlaza[] {
  return plazas.filter(plaza => pointToSegmentDistanceKm(plaza.lat, plaza.lng, origin[0], origin[1], destination[0], destination[1]) <= bufferKm);
}

export function calcRouteDistance(origin: [number, number], destination: [number, number]): number {
  return Math.round(haversineKm(origin[0], origin[1], destination[0], destination[1]));
}

export function getFeeColor(fee: number): string {
  if (fee === 0) return '#475569';
  if (fee < 70)  return '#10b981';
  if (fee < 100) return '#84cc16';
  if (fee < 150) return '#f59e0b';
  if (fee < 200) return '#f97316';
  return '#ef4444';
}

export function getVehicleMultiplier(vehicleType: VehicleType): number {
  const m: Record<VehicleType, number> = { car_jeep_van:1, lcv_minibus:1.6, bus_truck:3.3, multi_axle:5.0, heavy_construction:5.5, oversized:10.0 };
  return m[vehicleType];
}
