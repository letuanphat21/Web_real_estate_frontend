import { useState } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Lock, Mail, ArrowRight } from "lucide-react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";
import logo from "../../assets/images/logo.jpg";

const FOOTER_LINKS = [
  {
    title: "Khám phá",
    links: [
      { label: "Mua bán", path: "/mua-ban" },
      { label: "Dự án", path: "/du-an" },
      { label: "Bản đồ", path: "/ban-do" },
      { label: "So sánh căn", path: "/so-sanh" },
      { label: "VR360", path: "/vr360" },
    ],
  },
  {
    title: "Hệ sinh thái",
    links: [
      { label: "Đất Việt AI", path: "/dat-viet-ai" },
      { label: "Dành cho môi giới", path: "/moi-gioi" },
      { label: "Kho tài liệu", path: "/tai-lieu" },
      { label: "Cộng đồng", path: "/cong-dong" },
      { label: "Tuyển dụng", path: "/tuyen-dung" },
    ],
  },
  {
    title: "Hỗ trợ",
    links: [
      { label: "Trung tâm trợ giúp", path: "/tro-giup" },
      { label: "Liên hệ", path: "/lien-he" },
      { label: "Chính sách bảo mật", path: "/chinh-sach-bao-mat" },
      { label: "Điều khoản sử dụng", path: "/dieu-khoan" },
      { label: "Góp ý sản phẩm", path: "/gop-y" },
    ],
  },
];

const SOCIALS = [
  { icon: FaFacebookF, href: "https://facebook.com", label: "Facebook" },
  { icon: FaLinkedinIn, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: FaYoutube, href: "https://youtube.com", label: "YouTube" },
  { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    console.log("Đăng ký:", email);
    setEmail("");
  };

  return (
    <footer className="bg-footer text-white/60">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1.4fr]">
          <div className="lg:pr-10">
            <Link to="/" className="flex items-center gap-3">
              <img
                src={logo}
                alt="Đất Việt Group"
                className="h-10 w-10 rounded-xl object-contain"
              />
              <span className="text-xl font-medium text-white">
                Đất Việt <span className="text-primary-300">Group</span>
              </span>
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-white/75">
              Nền tảng proptech kết nối khách hàng, môi giới và nhà tuyển dụng
              bằng dữ liệu minh bạch và công nghệ AI.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <span className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-xs text-white/75 ring-1 ring-white/10">
                <ShieldCheck size={14} /> SSL 256-bit
              </span>
              <span className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-xs text-white/75 ring-1 ring-white/10">
                <Lock size={14} /> Bảo vệ dữ liệu
              </span>
            </div>
          </div>

          {FOOTER_LINKS.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-sm font-semibold text-white">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-sm transition-colors hover:text-primary-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">
              Bản tin thị trường
            </h4>
            <p className="mb-4 text-sm">
              Nhận báo cáo giá và cơ hội mới mỗi tuần.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="flex items-center gap-2 rounded-full bg-white/5 py-1.5 pl-4 pr-1.5 ring-1 ring-white/10 focus-within:ring-primary-500"
            >
              <Mail size={16} className="shrink-0" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email của bạn"
                className="min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Đăng ký"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-600 text-white transition hover:bg-primary-500"
              >
                <ArrowRight size={16} />
              </button>
            </form>

            <div className="mt-5 flex gap-3">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 transition hover:bg-primary-600 hover:text-white"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 py-6 text-xs md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} Đất Việt Group. Mọi quyền được bảo lưu.
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            <a href="tel:19008686" className="hover:text-white">
              Hotline: 1900 8686
            </a>
            <a href="mailto:hello@datvietgroup.vn" className="hover:text-white">
              hello@datvietgroup.vn
            </a>
            <span>TP. Hồ Chí Minh · Hà Nội · Đà Nẵng</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
