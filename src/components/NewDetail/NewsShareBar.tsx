import { useState } from "react";
import { Link2, Share2, Check } from "lucide-react";

interface NewsShareBarProps {
  title: string;
}

export default function NewsShareBar({ title }: NewsShareBarProps) {
  const [copied, setCopied] = useState<boolean>(false);
  const url = window.location.href;

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const share = async () => {
    if (navigator.share) {
      await navigator.share({ title, url }).catch(() => undefined);
    } else {
      await copyLink();
    }
  };

  const btn =
    "flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-heading transition hover:border-primary-300 hover:text-primary-600";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm text-body">Chia sẻ bài viết:</span>
      <button onClick={share} className={btn}>
        <Share2 size={15} /> Chia sẻ
      </button>
      <button onClick={copyLink} className={btn}>
        {copied ? (
          <Check size={15} className="text-success" />
        ) : (
          <Link2 size={15} />
        )}
        {copied ? "Đã sao chép" : "Sao chép liên kết"}
      </button>
    </div>
  );
}
