import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import AuthSplitLayout from "../../components/Auth/AuthSplitLayout";
import { AUTH_COPY, REGISTER_COPY } from "../../data/authContent";
import authService from "../../services/authService";
import { setSession } from "../../store/authStore";

const inputCls =
  "h-12 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm text-heading outline-none placeholder:text-muted focus:border-primary-300";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await authService.register({ fullName, identifier, password });
      setSession(res, true);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đăng ký không thành công.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthSplitLayout>
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-600">
        {REGISTER_COPY.welcome}
      </p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight text-heading">{REGISTER_COPY.title}</h1>
      <p className="mt-3 text-sm leading-relaxed text-body">{REGISTER_COPY.subtitle}</p>

      <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-heading">{REGISTER_COPY.nameLabel}</span>
          <span className="relative block">
            <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder={REGISTER_COPY.namePlaceholder}
              className={inputCls}
              autoComplete="name"
              required
            />
          </span>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-heading">{REGISTER_COPY.identifierLabel}</span>
          <span className="relative block">
            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder={REGISTER_COPY.identifierPlaceholder}
              className={inputCls}
              autoComplete="username"
              required
            />
          </span>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-heading">{REGISTER_COPY.passwordLabel}</span>
          <span className="relative block">
            <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={`${inputCls} pr-11`}
              autoComplete="new-password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-heading"
              aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </span>
        </label>

        {error && <p className="text-sm text-danger">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="h-12 w-full rounded-xl bg-footer text-sm font-semibold text-white transition hover:opacity-95 disabled:opacity-60"
        >
          {loading ? "Đang tạo tài khoản..." : REGISTER_COPY.submit}
        </button>
      </form>

      <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-wider text-muted">
        <span className="h-px flex-1 bg-line" />
        {REGISTER_COPY.divider}
        <span className="h-px flex-1 bg-line" />
      </div>

      <button
        type="button"
        className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-line bg-white text-sm font-medium text-heading transition hover:bg-primary-50"
      >
        <FcGoogle size={18} />
        {REGISTER_COPY.google}
      </button>

      <p className="mt-6 text-center text-xs leading-relaxed text-muted">
        {REGISTER_COPY.termsPrefix}{" "}
        <Link to={AUTH_COPY.termsHref} className="text-body underline-offset-2 hover:text-primary-600 hover:underline">
          {REGISTER_COPY.terms}
        </Link>{" "}
        và{" "}
        <Link to={AUTH_COPY.privacyHref} className="text-body underline-offset-2 hover:text-primary-600 hover:underline">
          {REGISTER_COPY.privacy}
        </Link>{" "}
        {REGISTER_COPY.of}
      </p>

      <p className="mt-6 text-center text-sm text-body">
        {REGISTER_COPY.hasAccount}{" "}
        <Link to="/login" className="font-semibold text-heading underline underline-offset-2 hover:text-primary-600">
          {REGISTER_COPY.login}
        </Link>
      </p>
    </AuthSplitLayout>
  );
}
