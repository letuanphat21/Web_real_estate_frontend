import { useState } from "react";
import { useParams } from "react-router-dom";
import ProjectTabs from "../../components/ProjectDetail/ProjectTabs";
import BookingLockModal from "../../components/ProjectDetail/BookingLockModal";
import { PROJECT, UNITS, SELECTED, BOOKING_UNIT, FEATURED } from "../../data/projectDetail/floorPlan";
import FloorPlanHero from "../../components/ProjectDetail/floorPlan/FloorPlanHero";
import FloorPlanBoard from "../../components/ProjectDetail/floorPlan/FloorPlanBoard";
import SelectedUnitCard from "../../components/ProjectDetail/floorPlan/SelectedUnitCard";
import FeaturedUnits from "../../components/ProjectDetail/floorPlan/FeaturedUnits";

export default function ProjectFloorPlanPage() {
  const { id } = useParams();
  const base = `/du-an/${id}`;
  const [selected, setSelected] = useState("1208");
  const [booking, setBooking] = useState(false);
  const p = PROJECT;

  return (
    <div className="bg-white">
      <ProjectTabs />
      {booking && (
        <BookingLockModal
          unit={BOOKING_UNIT}
          onClose={() => setBooking(false)}
        />
      )}

      <FloorPlanHero base={base} project={p} />

      {/* Sơ đồ + căn đang chọn */}
      <section className="bg-primary-50/70 py-12">
        <div className="container mx-auto grid gap-5 px-4 lg:grid-cols-[1fr_380px] lg:px-8">
          <FloorPlanBoard units={UNITS} selected={selected} setSelected={setSelected} />

          <SelectedUnitCard unit={SELECTED} setBooking={setBooking} />
        </div>
      </section>

      {/* Gợi ý */}
      <FeaturedUnits featured={FEATURED} base={base} />
    </div>
  );
}
