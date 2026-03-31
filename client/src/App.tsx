import { useState, useCallback } from 'react';
import { useTollData, getPlazasNearRoute, calcRouteDistance } from './hooks/useTollData';
import { TollPlaza, RouteState } from './types';
import Header from './components/Header';
import MapView from './components/Map/MapView';
import Sidebar from './components/Sidebar/Sidebar';
import AnalyticsPanel from './components/Analytics/AnalyticsPanel';
import { DEFAULT_LAYER_FILTERS, LayerFilters } from './components/Sidebar/LayersPanel';

const INITIAL_ROUTE: RouteState = {
  isActive: false,
  step: 'idle',
  origin: null,
  destination: null,
  plazasOnRoute: [],
  totalCost: 0,
  distanceKm: 0,
};

export default function App() {
  const {
    filteredPlazas,
    filters,
    updateFilter,
    resetFilters,
    activeFilterCount,
    stats,
    stateDistribution,
    highwayDistribution,
    feeDistribution,
    availableStates,
    availableHighways,
    loading,
  } = useTollData();

  const [selectedPlaza, setSelectedPlaza] = useState<TollPlaza | null>(null);
  const [routeState, setRouteState] = useState<RouteState>(INITIAL_ROUTE);
  const [analyticsOpen, setAnalyticsOpen] = useState(true);
  const [layerFilters, setLayerFilters] = useState<LayerFilters>(DEFAULT_LAYER_FILTERS);

  const updateLayer = useCallback((patch: Partial<LayerFilters>) => {
    setLayerFilters(prev => ({ ...prev, ...patch }));
  }, []);

  const handleSelectPlaza = useCallback((plaza: TollPlaza | null) => {
    setSelectedPlaza(plaza);
  }, []);

  const handleToggleRouteMode = useCallback(() => {
    if (routeState.isActive) {
      setRouteState(INITIAL_ROUTE);
    } else {
      setRouteState({ ...INITIAL_ROUTE, isActive: true, step: 'picking-origin' });
    }
  }, [routeState.isActive]);

  const handleMapClick = useCallback((lat: number, lng: number) => {
    if (!routeState.isActive) return;
    if (routeState.step === 'picking-origin') {
      setRouteState(prev => ({
        ...prev,
        step: 'picking-destination',
        origin: { lat, lng, label: `${lat.toFixed(4)}, ${lng.toFixed(4)}` },
      }));
    } else if (routeState.step === 'picking-destination') {
      const origin: [number, number] = [routeState.origin!.lat, routeState.origin!.lng];
      const destination: [number, number] = [lat, lng];
      const plazasOnRoute = getPlazasNearRoute(filteredPlazas, origin, destination);
      const totalCost = plazasOnRoute.reduce((sum, p) => sum + p.fees[filters.vehicleType], 0);
      const distanceKm = calcRouteDistance(origin, destination);
      setRouteState(prev => ({
        ...prev, step: 'complete',
        destination: { lat, lng, label: `${lat.toFixed(4)}, ${lng.toFixed(4)}` },
        plazasOnRoute, totalCost, distanceKm,
      }));
    }
  }, [routeState, filteredPlazas, filters.vehicleType]);

  return (
    <div className="flex flex-col h-screen bg-surface-900 text-slate-100 overflow-hidden">
      <Header
        stats={stats}
        filteredCount={filteredPlazas.length}
        routeState={routeState}
        onToggleRoute={handleToggleRouteMode}
        analyticsOpen={analyticsOpen}
        onToggleAnalytics={() => setAnalyticsOpen(v => !v)}
        loading={loading}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          filteredPlazas={filteredPlazas}
          selectedPlaza={selectedPlaza}
          filters={filters}
          updateFilter={updateFilter}
          resetFilters={resetFilters}
          activeFilterCount={activeFilterCount}
          availableStates={availableStates}
          availableHighways={availableHighways}
          onSelectPlaza={handleSelectPlaza}
          routeState={routeState}
          layerFilters={layerFilters}
          onUpdateLayer={updateLayer}
        />

        <MapView
          plazas={layerFilters.plazasVisible ? filteredPlazas : []}
          selectedPlaza={selectedPlaza}
          onSelectPlaza={handleSelectPlaza}
          routeState={routeState}
          onMapClick={handleMapClick}
          vehicleType={filters.vehicleType}
          layerFilters={layerFilters}
        />

        {analyticsOpen && (
          <AnalyticsPanel
            filteredPlazas={filteredPlazas}
            stateDistribution={stateDistribution}
            highwayDistribution={highwayDistribution}
            feeDistribution={feeDistribution}
            routeState={routeState}
            vehicleType={filters.vehicleType}
          />
        )}
      </div>
    </div>
  );
}
