import BookingCard from "./BookingCard";
import type { Booking } from "../../types/booking.types";

type Props = {
  rows: Booking[];
  selected: Set<number>;
  toggle: (id: number) => void;
};

export default function BookingList({ rows, selected, toggle }: Props) {
  return (
    <ul className="mt-4 space-y-4">
      {rows.map((b) => (
        <BookingCard key={b.id} b={b} checked={selected.has(b.id)} onToggle={() => toggle(b.id)} />
      ))}
      {rows.length === 0 && (
        <li className="rounded-2xl border border-line bg-white py-14 text-center text-body">Không có booking nào phù hợp với bộ lọc.</li>
      )}
    </ul>
  );
}
