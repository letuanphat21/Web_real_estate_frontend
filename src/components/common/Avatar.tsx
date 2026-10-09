import { initials } from "../../utils/user";

interface AvatarProps {
  src?: string | null;
  fullName: string;
  className?: string;
}

export default function Avatar({ src, fullName, className = "h-10 w-10" }: AvatarProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={fullName}
        className={`${className} rounded-full object-cover`}
      />
    );
  }

  return (
    <span
      className={`${className} flex items-center justify-center rounded-full bg-primary-100 font-semibold text-primary-700`}
    >
      {initials(fullName)}
    </span>
  );
}
