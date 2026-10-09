// Các phân hệ mở rộng của dự án; chưa triển khai nên chỉ hiển thị trạng thái
const ITEMS = ["Quỹ căn", "Bản đồ", "So sánh", "3D / VR360"];

export default function ExtendedLinks() {
  return (
    <section className="mt-6">
      <h2 className="text-lg font-bold text-footer">Kết nối mở rộng</h2>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map((t) => (
          <div key={t} className="rounded-xl border border-line bg-white px-5 py-4">
            <p className="font-semibold text-footer">{t}</p>
            <span className="mt-3 inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700">Sắp triển khai</span>
          </div>
        ))}
      </div>
    </section>
  );
}
