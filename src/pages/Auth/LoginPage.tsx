import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import Auth3DScene from "../../components/Auth/Auth3DScene";
import TiltCard from "../../components/Auth/TiltCard";
import { AUTH_COPY, LOGIN_COPY } from "../../data/authContent";
import authService from "../../services/auth/authService";
import logo from "../../assets/images/logo.jpg";
const inputCls =
  "h-13 w-full rounded-xl border border-primary-100 bg-primary-50/40 pl-12 pr-4 text-[15px] text-heading outline-none transition placeholder:text-body/70 focus:border-primary-300 focus:bg-white focus:ring-4 focus:ring-primary-100";

export default function LoginPage() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await authService.login({ identifier, password, remember });
      // Quay lại trang trước khi bị đá về login (do axios gắn ?redirect=)
      const redirect = new URLSearchParams(window.location.search).get(
        "redirect"
      );
      navigate(redirect?.startsWith("/") ? redirect : "/", { replace: true });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Đăng nhập không thành công."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070d1f]">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-primary-600/30 blur-[120px]" />
        <div className="absolute -bottom-48 right-0 h-[560px] w-[560px] rounded-full bg-indigo-500/20 blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />
      </div>

      <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-4 py-10 lg:grid-cols-[1.1fr_1fr] lg:px-8">
        {/* ===== Trái: thương hiệu + khu đô thị 3D (ẩn trên mobile) ===== */}
        <section className="hidden lg:block">
          <Link to="/" className="inline-flex items-center gap-2 text-white">
            <img
              src={logo}
              alt="Logo"
              className="h-9 w-9 rounded-xl object-cover"
            />
            <span className="text-lg font-semibold tracking-tight">
              Đất Việt Group
            </span>
          </Link>
          <h2 className="relative z-10 mt-8 max-w-md text-4xl font-bold leading-tight tracking-tight text-white">
            Không gian sống{" "}
            <span className="bg-gradient-to-r from-primary-300 to-sky-200 bg-clip-text text-transparent">
              trong tầm tay
            </span>{" "}
            bạn
          </h2>
          <p className="relative z-10 mt-3 max-w-md text-sm leading-relaxed text-white/60">
            Theo dõi dự án, đăng ký sự kiện và cập nhật thị trường bất động sản
            — tất cả trong một tài khoản.
          </p>
          <Auth3DScene />
        </section>

        <section className="mx-auto w-full max-w-[460px]">
          <TiltCard>
            <div className="p-8 sm:p-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-600">
                {LOGIN_COPY.welcome}
              </p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-navy">
                {LOGIN_COPY.title}
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-body">
                {LOGIN_COPY.subtitle}
              </p>

              <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                <label className="block">
                  <span className="mb-2 block text-xs font-bold text-navy">
                    {LOGIN_COPY.identifierLabel}
                  </span>
                  <span className="relative block">
                    <Mail
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-body"
                    />
                    <input
                      type="text"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder={LOGIN_COPY.identifierPlaceholder}
                      className={inputCls}
                      autoComplete="username"
                      required
                    />
                  </span>
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-bold text-navy">
                    {LOGIN_COPY.passwordLabel}
                  </span>
                  <span className="relative block">
                    <Lock
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-body"
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className={`${inputCls} pr-11`}
                      autoComplete="current-password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-body hover:text-heading"
                      aria-label={
                        showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"
                      }
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </span>
                </label>

                <div className="flex items-center justify-between text-xs">
                  <label className="flex cursor-pointer items-center gap-2 text-body">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      className="h-4 w-4 rounded accent-primary-600"
                    />
                    {LOGIN_COPY.remember}
                  </label>
                  <Link
                    to="/quen-mat-khau"
                    className="font-bold text-primary-600 hover:text-primary-700 hover:underline"
                  >
                    {LOGIN_COPY.forgot}
                  </Link>
                </div>

                {error && (
                  <p
                    role="alert"
                    className="rounded-xl bg-danger/10 px-4 py-3 text-sm text-danger"
                  >
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="group relative h-13 w-full rounded-xl bg-primary-700 transition disabled:opacity-60"
                >
                  <span className="absolute inset-0 flex -translate-y-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-base font-bold text-white transition group-hover:-translate-y-1.5 group-active:translate-y-0 group-disabled:translate-y-0">
                    {loading ? "Đang đăng nhập..." : LOGIN_COPY.submit}
                    {!loading && (
                      <ArrowRight
                        size={18}
                        className="transition group-hover:translate-x-1"
                      />
                    )}
                  </span>
                </button>
              </form>

              <div className="my-5 flex items-center gap-3 text-[10px] uppercase tracking-wider text-body">
                <span className="h-px flex-1 bg-primary-100" />
                {LOGIN_COPY.divider}
                <span className="h-px flex-1 bg-primary-100" />
              </div>

              <button
                type="button"
                className="flex h-13 w-full items-center justify-center gap-3 rounded-xl border border-primary-100 bg-white text-[15px] font-medium text-navy shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <FcGoogle size={18} />
                {LOGIN_COPY.google}
              </button>

              <p className="mt-6 text-center text-[11px] leading-relaxed text-body">
                {LOGIN_COPY.termsPrefix}{" "}
                <Link
                  to={AUTH_COPY.termsHref}
                  className="underline-offset-2 hover:text-primary-600 hover:underline"
                >
                  {LOGIN_COPY.terms}
                </Link>{" "}
                và{" "}
                <Link
                  to={AUTH_COPY.privacyHref}
                  className="underline-offset-2 hover:text-primary-600 hover:underline"
                >
                  {LOGIN_COPY.privacy}
                </Link>{" "}
                {LOGIN_COPY.of}
              </p>
            </div>
          </TiltCard>

          <p className="mt-6 text-center text-sm text-white/70">
            {LOGIN_COPY.noAccount}{" "}
            <Link
              to="/register"
              className="font-bold text-white underline underline-offset-4 hover:text-primary-300"
            >
              {LOGIN_COPY.register}
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
