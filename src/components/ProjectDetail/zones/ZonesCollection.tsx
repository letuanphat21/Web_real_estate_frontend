import ZoneCard from "./ZoneCard";
import type { ZONES } from "../../../data/projectDetail/zones";

type Props = {
  base: string;
  zones: typeof ZONES;
};

export default function ZonesCollection({ base, zones }: Props) {
  return (
    <section className="bg-primary-50/70 py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <p className="text-xs font-semibold uppercase text-primary-600">Bộ sưu tập phân khu</p>
        <h2 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight text-heading">Chọn một phong cách sống mang dấu ấn riêng</h2>
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {zones.map((z) => (
            <ZoneCard key={z.id} zone={z} to={`${base}/mat-bang`} />
          ))}
        </div>
      </div>
    </section>
  );
}
