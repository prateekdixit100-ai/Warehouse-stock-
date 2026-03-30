import { useMemo, useState } from 'react';
import { TOLL_PLAZAS, INDIA_STATES, HIGHWAYS } from '../data/tollPlazas';
import { FilterState, TollPlaza, AppStats, VehicleType } from '../types';

const DEFAULT_FILTERS: FilterState = {
  states: [],
  highways: [],
  minFee: 0,
  maxFee: 2000,
  searchQuery: '',
  vehicleType: 'car_jeep_van',
};

export function useTollData() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  const allPlazas = TOLL_PLAZAS;

  const filteredPlazas = useMemo((): TollPlaza[] => {
    return allPlazas.filter(plaza => {
      if (filters.states.length > 0 && !filters.states.includes(plaza.state)) return false;
      if (filters.highways.length > 0 && !filters.highways.includes(plaza.highway)) return false;

      const fee = plaza.fees[filters.vehicleType];
      if (fee < filters.minFee || fee > filters.maxFee) return false;

      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        if (
          !plaza.name.toLowerCase().includes(q) &&
          !plaza.highway.toLowerCase().includes(q) &&
          !plaza.state.toLowerCase().includes(q) &&
          !plaza.district.toLowerCase().includes(q)
        ) return false;
      }

      return true;
    });
  }, [allPlazas, filters]);

  const stats = useMemo((): AppStats => {
    const fees = allPlazas.map(p => p.fees.car_jeep_van);
    return {
      totalPlazas: allPlazas.length,
      uniqueStates: new Set(allPlazas.map(p => p.state)).size,
      uniqueHighways: new Set(allPlazas.map(p => p.highway)).size,
      avgCarFee: Math.round(fees.reduce((a, b) => a + b, 0) / fees.length),
      maxCarFee: Math.max(...fees),
      minCarFee: Math.min(...fees),
    };
  }, [allPlazas]);

  const stateDistribution = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredPlazas.forEach(p => {
      counts[p.state] = (counts[p.state] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([state, count]) => ({ state, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 12);
  }, [filteredPlazas]);

  const highwayDistribution = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredPlazas.forEach(p => {
      counts[p.highway] = (counts[p.highway] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([highway, count]) => ({ highway, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }, [filteredPlazas]);

  const feeDistribution = useMemo(() => {
    const buckets: Record<string, number> = {
      '< ₹70': 0, '₹70–80': 0, '₹80–90': 0, '₹90–100': 0, '> ₹100': 0,
    };
    filteredPlazas.forEach(p => {
      const fee = p.fees[filters.vehicleType];
      if (fee < 70) buckets['< ₹70']++;
      else if (fee < 80) buckets['₹70–80']++;
      else if (fee < 90) buckets['₹80–90']++;
      else if (fee < 100) buckets['₹90–100']++;
      else buckets['> ₹100']++;
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
    if (filters.minFee > 0 || filters.maxFee < 2000) count++;
    if (filters.searchQuery) count++;
    return count;
  }, [filters]);

  return {
    allPlazas,
    filteredPlazas,
    filters,
    updateFilter,
    resetFilters,
    activeFilterCount,
    stats,
    stateDistribution,
    highwayDistribution,
    feeDistribution,
    availableStates: INDIA_STATES,
    availableHighways: HIGHWAYS,
  };
}

// ── Route utilities ──────────────────────────────────────────────────────────

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

/** Cross-track distance from a point to a great-circle segment (approximate, flat-earth). */
function pointToSegmentDistanceKm(
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
  const closestLat = aLat + t * dy;
  const closestLng = aLng + t * dx;
  return haversineKm(pLat, pLng, closestLat, closestLng);
}

export function getPlazasNearRoute(
  plazas: TollPlaza[],
  origin: [number, number],
  destination: [number, number],
  bufferKm = 50
): TollPlaza[] {
  return plazas.filter(plaza =>
    pointToSegmentDistanceKm(
      plaza.lat, plaza.lng,
      origin[0], origin[1],
      destination[0], destination[1]
    ) <= bufferKm
  );
}

export function calcRouteDistance(origin: [number, number], destination: [number, number]): number {
  return Math.round(haversineKm(origin[0], origin[1], destination[0], destination[1]));
}

export function getFeeColor(fee: number): string {
  if (fee < 70) return '#10b981';   // green
  if (fee < 80) return '#84cc16';   // lime
  if (fee < 90) return '#f59e0b';   // amber
  if (fee < 100) return '#f97316';  // orange
  return '#ef4444';                  // red
}

export function getVehicleMultiplier(vehicleType: VehicleType): number {
  const multipliers: Record<VehicleType, number> = {
    car_jeep_van: 1,
    lcv_minibus: 1.6,
    bus_truck: 3.3,
    multi_axle: 5.0,
    heavy_construction: 5.5,
    oversized: 10.0,
  };
  return multipliers[vehicleType];
}
