import { Layers, Map, Eye, EyeOff, Train } from 'lucide-react';
import clsx from 'clsx';
import { CLUSTER_COLORS } from '../../data/colliersWarehousing';
import { HUB_TYPE_LABELS, HUB_TYPE_COLORS } from '../../data/mpLandband';

export type BasemapStyle = 'dark' | 'satellite' | 'terrain';

export interface LayerFilters {
  // Basemap
  basemap: BasemapStyle;
  // Toll plazas
  plazasVisible: boolean;
  // State boundaries
  boundariesVisible: boolean;
  // Rail network
  railVisible: boolean;
  // MP Landband
  landbandVisible: boolean;
  landbandTypes: string[];   // hub types to show (empty = all)
  // Colliers warehousing
  colliersVisible: boolean;
  colliersClusters: string[]; // PRIME / EMERGING / NASCENT (empty = all)
  colliersRegions: string[];  // North / South / East / West / Central
  colliersCorridors: boolean; // show/hide corridor lines
}

export const DEFAULT_LAYER_FILTERS: LayerFilters = {
  basemap: 'dark',
  plazasVisible: true,
  boundariesVisible: true,
  railVisible: false,
  landbandVisible: false,
  landbandTypes: [],
  colliersVisible: false,
  colliersClusters: [],
  colliersRegions: [],
  colliersCorridors: true,
};

const HUB_TYPES = Object.keys(HUB_TYPE_LABELS) as (keyof typeof HUB_TYPE_LABELS)[];
const CLUSTERS = ['PRIME', 'EMERGING', 'NASCENT'] as const;
const REGIONS = ['North', 'South', 'East', 'West', 'Central'] as const;

interface LayersPanelProps {
  layerFilters: LayerFilters;
  onUpdate: (patch: Partial<LayerFilters>) => void;
}

export default function LayersPanel({ layerFilters: lf, onUpdate }: LayersPanelProps) {
  const toggle = (key: keyof LayerFilters) => onUpdate({ [key]: !lf[key] });

  function toggleArr<T extends string>(key: keyof LayerFilters, val: T) {
    const arr = lf[key] as T[];
    onUpdate({ [key]: arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val] });
  }

  return (
    <div className="flex flex-col gap-0 overflow-y-auto flex-1 text-xs">

      {/* ── Basemap selector ─────────── */}
      <div className="px-4 py-3 border-b border-slate-700/40">
        <div className="text-slate-500 mb-2 font-medium">Basemap</div>
        <div className="flex gap-1.5">
          {([['dark','Dark'],['satellite','Satellite'],['terrain','Terrain']] as [BasemapStyle, string][]).map(([key, label]) => (
            <button
              key={key}
              onClick={() => onUpdate({ basemap: key })}
              className={clsx(
                'flex-1 py-1.5 rounded border text-xs font-medium transition-colors',
                lf.basemap === key
                  ? 'bg-blue-700 border-blue-500 text-white'
                  : 'border-slate-600 text-slate-400 hover:border-slate-500'
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── State Boundaries ─────────── */}
      <LayerRow
        icon={<Map size={13} />}
        label="State Boundaries"
        sublabel="India state outlines"
        color="#64748b"
        active={lf.boundariesVisible}
        onToggle={() => toggle('boundariesVisible')}
      />

      {/* ── Toll Plazas ─────────────── */}
      <LayerRow
        icon={<div className="w-3 h-3 rounded-full bg-emerald-500" />}
        label="Toll Plazas"
        sublabel="1,563 NHAI plazas (clustered)"
        color="#10b981"
        active={lf.plazasVisible}
        onToggle={() => toggle('plazasVisible')}
      />

      {/* ── Rail Network ─────────────── */}
      <LayerRow
        icon={<Train size={13} />}
        label="Rail Network"
        sublabel="Indian Railways lines"
        color="#f97316"
        active={lf.railVisible}
        onToggle={() => toggle('railVisible')}
      />

      {/* ── MP Landband ─────────────── */}
      <LayerSection
        label="MP Landband"
        sublabel="7 corridors · 20 hubs"
        color="#f59e0b"
        active={lf.landbandVisible}
        onToggle={() => toggle('landbandVisible')}
      >
        {lf.landbandVisible && (
          <div className="px-4 pb-3">
            <div className="text-slate-500 mb-1.5">Hub types</div>
            <div className="flex flex-wrap gap-1">
              {HUB_TYPES.map(t => {
                const selected = lf.landbandTypes.length === 0 || lf.landbandTypes.includes(t);
                return (
                  <button
                    key={t}
                    onClick={() => toggleArr('landbandTypes', t)}
                    className={clsx(
                      'px-2 py-0.5 rounded border text-xs transition-colors',
                      lf.landbandTypes.length === 0 || lf.landbandTypes.includes(t)
                        ? 'border-amber-600/60 text-amber-300'
                        : 'border-slate-600 text-slate-500'
                    )}
                    style={selected ? { background: `${HUB_TYPE_COLORS[t]}25` } : {}}
                  >
                    {HUB_TYPE_LABELS[t]}
                  </button>
                );
              })}
            </div>
            {lf.landbandTypes.length > 0 && (
              <button
                onClick={() => onUpdate({ landbandTypes: [] })}
                className="mt-1.5 text-slate-500 hover:text-amber-400 text-xs"
              >
                Show all types
              </button>
            )}
          </div>
        )}
      </LayerSection>

      {/* ── Colliers Warehousing ─────── */}
      <LayerSection
        label="Warehousing Hotspots"
        sublabel="30 cities · 8 corridors · 5 MMLPs"
        color="#3b82f6"
        active={lf.colliersVisible}
        onToggle={() => toggle('colliersVisible')}
      >
        {lf.colliersVisible && (
          <div className="px-4 pb-3 space-y-3">
            {/* Cluster tier */}
            <div>
              <div className="text-slate-500 mb-1.5">Tier</div>
              <div className="flex gap-1">
                {CLUSTERS.map(c => {
                  const active = lf.colliersClusters.length === 0 || lf.colliersClusters.includes(c);
                  return (
                    <button
                      key={c}
                      onClick={() => toggleArr('colliersClusters', c)}
                      className={clsx(
                        'flex-1 py-1 rounded border text-xs font-medium transition-colors',
                        active ? 'border-transparent text-white' : 'border-slate-600 text-slate-500 bg-transparent'
                      )}
                      style={active ? { background: CLUSTER_COLORS[c] } : {}}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>
            </div>
            {/* Region */}
            <div>
              <div className="text-slate-500 mb-1.5">Region</div>
              <div className="flex flex-wrap gap-1">
                {REGIONS.map(r => {
                  const active = lf.colliersRegions.length === 0 || lf.colliersRegions.includes(r);
                  return (
                    <button
                      key={r}
                      onClick={() => toggleArr('colliersRegions', r)}
                      className={clsx(
                        'px-2 py-0.5 rounded border text-xs transition-colors',
                        active
                          ? 'bg-blue-700/40 border-blue-500/60 text-blue-200'
                          : 'border-slate-600 text-slate-500'
                      )}
                    >
                      {r}
                    </button>
                  );
                })}
              </div>
            </div>
            {/* Corridors toggle */}
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Show Corridors</span>
              <button
                onClick={() => toggle('colliersCorridors')}
                className={clsx(
                  'px-2 py-0.5 rounded text-xs border transition-colors',
                  lf.colliersCorridors
                    ? 'bg-blue-700/40 border-blue-500/60 text-blue-200'
                    : 'border-slate-600 text-slate-500'
                )}
              >
                {lf.colliersCorridors ? 'On' : 'Off'}
              </button>
            </div>
            {(lf.colliersClusters.length > 0 || lf.colliersRegions.length > 0) && (
              <button
                onClick={() => onUpdate({ colliersClusters: [], colliersRegions: [] })}
                className="text-slate-500 hover:text-blue-400 text-xs"
              >
                Clear tier / region filters
              </button>
            )}
          </div>
        )}
      </LayerSection>
    </div>
  );
}

function LayerRow({ icon, label, sublabel, color, active, onToggle }: {
  icon: React.ReactNode; label: string; sublabel: string;
  color: string; active: boolean; onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700/40">
      <div className="flex items-center gap-2.5">
        <div className="text-slate-400">{icon}</div>
        <div>
          <div className={clsx('font-medium', active ? 'text-slate-100' : 'text-slate-500')}>{label}</div>
          <div className="text-slate-600">{sublabel}</div>
        </div>
      </div>
      <button onClick={onToggle} className="flex-shrink-0 ml-2">
        {active
          ? <Eye size={15} className="text-slate-300" style={{ color }} />
          : <EyeOff size={15} className="text-slate-600" />}
      </button>
    </div>
  );
}

function LayerSection({ label, sublabel, color, active, onToggle, children }: {
  label: string; sublabel: string; color: string;
  active: boolean; onToggle: () => void; children?: React.ReactNode;
}) {
  return (
    <div className="border-b border-slate-700/40">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: color }} />
          <div>
            <div className={clsx('font-medium', active ? 'text-slate-100' : 'text-slate-500')}>{label}</div>
            <div className="text-slate-600">{sublabel}</div>
          </div>
        </div>
        <button onClick={onToggle} className="flex-shrink-0 ml-2">
          {active
            ? <Eye size={15} className="text-slate-300" style={{ color }} />
            : <EyeOff size={15} className="text-slate-600" />}
        </button>
      </div>
      {children}
    </div>
  );
}
