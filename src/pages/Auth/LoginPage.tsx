import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import AuthSplitLayout from "../../components/Auth/AuthSplitLayout";
import { AUTH_COPY, LOGIN_COPY } from "../../data/authContent";
import authService from "../../services/authService";

const inputCls =
  "h-14 w-full rounded-xl border border-blue-100 bg-white pl-12 pr-4 text-[15px] text-heading shadow-sm outline-none placeholder:text-body focus:border-primary-300";

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
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đăng nhập không thành công.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthSplitLayout>
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-600">
        {LOGIN_COPY.welcome}
      </p>
      <h1 className="mt-3 text-5xl font-bold tracking-tight text-navy">{LOGIN_COPY.title}</h1>
      <p className="mt-4 text-sm leading-relaxed text-body">{LOGIN_COPY.subtitle}</p>

      <form className="mt-9 space-y-5" onSubmit={handleSubmit}>
        <label className="block">
          <span className="mb-2 block text-xs font-bold text-navy">{LOGIN_COPY.identifierLabel}</span>
          <span className="relative block">
            <Mail size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-body" />
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
          <span className="mb-2 block text-xs font-bold text-navy">{LOGIN_COPY.passwordLabel}</span>
          <span className="relative block">
            <Lock size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-body" />
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
              aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
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
              className="h-4 w-4 rounded accent-navy"
            />
            {LOGIN_COPY.remember}
          </label>
          <Link to="/quen-mat-khau" className="font-bold text-primary-600 underline underline-offset-2 hover:text-primary-700">
            {LOGIN_COPY.forgot}
          </Link>
        </div>

        {error && <p className="text-sm text-danger">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="h-14 w-full rounded-xl bg-[#0F172A] text-lg font-bold text-white shadow-lg shadow-[#0F172A]/30 transition hover:opacity-95 disabled:opacity-60"
        >
          {loading ? "Đang đăng nhập..." : LOGIN_COPY.submit}
        </button>
      </form>

      <div className="my-5 flex items-center gap-3 text-[10px] uppercase tracking-wider text-body">
        <span className="h-px flex-1 bg-blue-100" />
        {LOGIN_COPY.divider}
        <span className="h-px flex-1 bg-blue-100" />
      </div>

      <button
        type="button"
        className="flex h-14 w-full items-center justify-center gap-3 rounded-xl border border-blue-100 bg-white text-[15px] font-medium text-navy shadow-sm transition hover:bg-primary-50"
      >
        <FcGoogle size={18} />
        {LOGIN_COPY.google}
      </button>

      <p className="mt-7 text-center text-[11px] leading-relaxed text-body">
        {LOGIN_COPY.termsPrefix}{" "}
        <Link to={AUTH_COPY.termsHref} className="text-body underline-offset-2 hover:text-primary-600 hover:underline">
          {LOGIN_COPY.terms}
        </Link>{" "}
        và{" "}
        <Link to={AUTH_COPY.privacyHref} className="text-body underline-offset-2 hover:text-primary-600 hover:underline">
          {LOGIN_COPY.privacy}
        </Link>{" "}
        {LOGIN_COPY.of}
      </p>

      <p className="mt-9 text-center text-xl font-semibold text-navy">
        {LOGIN_COPY.noAccount}{" "}
        <Link to="/register" className="font-bold text-navy underline underline-offset-2 hover:text-primary-600">
          {LOGIN_COPY.register}
        </Link>
      </p>
    </AuthSplitLayout>
  );
}
