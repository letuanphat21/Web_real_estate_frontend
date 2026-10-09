import { useToggle } from "../../../hooks/social/useToggle";

// Bài dài hơn số ký tự này thì cắt bớt và hiện nút "Xem thêm"
const MAX_PREVIEW_CHARS = 200;

type Props = {
  content: string;
  /** false: luôn hiện đủ (dùng trong modal bài viết) */
  collapsible?: boolean;
};

export default function PostContent({ content, collapsible = true }: Props) {
  const expanded = useToggle(false);
  if (!content) return null;

  const collapsed = collapsible && !expanded.value && content.length > MAX_PREVIEW_CHARS;

  return (
    <p className="mb-3 whitespace-pre-line text-sm text-gray-800">
      {collapsed ? `${content.slice(0, MAX_PREVIEW_CHARS).trimEnd()}... ` : content}
      {collapsed && (
        <button onClick={expanded.setOn} className="font-semibold text-gray-500 hover:underline">
          Xem thêm
        </button>
      )}
    </p>
  );
}
