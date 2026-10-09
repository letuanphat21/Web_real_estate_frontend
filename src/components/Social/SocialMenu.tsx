import { Link } from "react-router-dom";
import { MOCK_SOCIAL_MENU } from "../../data/mockSocial";

type Props = {
  activeId: string;
  onSelect: (id: string) => void;
};

export default function SocialMenu({ activeId, onSelect }: Props) {
  const itemClass = (active: boolean) =>
    `block w-full rounded-lg px-3 py-2 my-1 text-left text-sm font-medium transition ${
      active ? "bg-primary-50 text-primary-600" : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <nav className="rounded-xl bg-white p-2 shadow-sm">
      {MOCK_SOCIAL_MENU.map((item) =>
        item.path ? (
          <Link key={item.id} to={item.path} className={itemClass(false)}>
            {item.label}
          </Link>
        ) : (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={itemClass(activeId === item.id)}
          >
            {item.label}
          </button>
        ),
      )}
    </nav>
  );
}
