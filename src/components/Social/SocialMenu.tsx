import { MOCK_SOCIAL_MENU } from "../../data/mockSocial";

type Props = {
  activeId: string;
  onSelect: (id: string) => void;
};

export default function SocialMenu({ activeId, onSelect }: Props) {
  return (
    <nav className="rounded-xl bg-white p-2 shadow-sm">
      {MOCK_SOCIAL_MENU.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelect(item.id)}
          className={`block w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition ${
            activeId === item.id ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}
