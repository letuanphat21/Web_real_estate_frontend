import { useMemo } from "react";
import { MapContainer, ImageOverlay, Marker, ZoomControl } from "react-leaflet";
import { CRS, divIcon, type LatLngBoundsExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { STATUS } from "./floorPlanStatus";
import { MASTER_PLAN_IMAGE, MASTER_PLAN_SIZE } from "../../../data/projectDetail/floorPlan";
import type { UNITS } from "../../../data/projectDetail/floorPlan";

type Props = {
  units: typeof UNITS;
  selected: string;
  setSelected: (no: string) => void;
};

const { width: W, height: H } = MASTER_PLAN_SIZE;
const BOUNDS: LatLngBoundsExpression = [[0, 0], [H, W]];

// Tọa độ lưu dạng % trên ảnh (gốc trên-trái) → đổi sang pixel của ảnh cho CRS.Simple (y hướng lên)
const toLatLng = (left: string, top: string): [number, number] => [
  H * (1 - parseFloat(top) / 100),
  W * (parseFloat(left) / 100),
];

export default function FloorPlanBoard({ units, selected, setSelected }: Props) {
  const markers = useMemo(
    () =>
      units.map((u) => {
        const active = selected === u.no;
        const html = `<div class="flex h-8 min-w-12 items-center justify-center rounded-full border-2 border-white px-2 text-[11px] font-bold text-white shadow ${
          active ? "bg-primary-600 ring-4 ring-primary-200" : STATUS[u.status].pin
        }">${u.no}</div>`;
        return {
          u,
          icon: divIcon({ html, className: "", iconSize: [48, 32], iconAnchor: [24, 16] }),
        };
      }),
    [units, selected],
  );

  return (
    <div className="relative isolate overflow-hidden rounded-3xl border border-line bg-white" style={{ height: 660 }}>
      <MapContainer
        crs={CRS.Simple}
        bounds={BOUNDS}
        maxBounds={BOUNDS}
        maxBoundsViscosity={1}
        minZoom={-2}
        maxZoom={2}
        zoomSnap={0.25}
        zoomControl={false}
        attributionControl={false}
        className="h-full w-full bg-white!"
      >
        <ImageOverlay url={MASTER_PLAN_IMAGE} bounds={BOUNDS} />
        <ZoomControl position="topright" />
        {markers.map(({ u, icon }) => (
          <Marker
            key={u.no}
            position={toLatLng(u.left, u.top)}
            icon={icon}
            zIndexOffset={selected === u.no ? 1000 : 0}
            eventHandlers={{ click: () => setSelected(u.no) }}
          />
        ))}
      </MapContainer>

      <div className="absolute bottom-5 left-5 z-500 flex flex-wrap gap-3 rounded-xl bg-white/95 px-4 py-2.5 text-[11px] text-heading shadow">
        {Object.entries(STATUS).map(([k, s]) => (
          <span key={k} className="flex items-center gap-1.5">
            <span className={`h-2.5 w-2.5 rounded-full ${s.dot}`} /> {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}
