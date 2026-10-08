import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { HelpCircle } from "lucide-react";
import logo from "../../assets/images/logo.jpg";
import { AUTH_COPY, AUTH_HERO } from "../../data/authContent";
import type { AuthLocale } from "../../types/auth/auth.types";

type Props = {
  children: ReactNode;
};

export default function AuthSplitLayout({ children }: Props) {
  const [locale, setLocale] = useState<AuthLocale>("VI");

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-100 to-blue-300">
      <div className="grid min-h-screen lg:grid-cols-[56fr_44fr]">
        <section className="relative hidden overflow-hidden lg:block">
          <img
            src={AUTH_HERO.image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-footer/90 via-footer/10 to-black/5" />

          <Link to="/" className="absolute left-11 top-11 z-10 flex items-center gap-3">
            <img src={logo} alt="Đất Việt Group" className="h-10 w-10 rounded-xl object-contain" />
            <span className="text-lg font-medium tracking-tight text-white">
              Đất Việt <span className="text-primary-200">Group</span>
            </span>
          </Link>

          <div className="absolute inset-x-0 bottom-0 z-10 px-11 pb-12">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-warning" />
              {AUTH_HERO.badge}
            </span>
            <h2 className="mt-5 max-w-2xl text-3xl font-bold leading-tight text-white xl:text-[44px]">
              {AUTH_HERO.title}
            </h2>
            <p className="mt-4 max-w-md text-xs leading-relaxed text-white/85">
              {AUTH_HERO.description}
            </p>
          </div>
        </section>

        <section className="relative flex flex-col px-5 py-8 sm:px-10 lg:px-20 lg:py-12">
          <div className="flex items-center justify-between gap-4">
            <p className="hidden text-[10px] font-semibold uppercase tracking-[0.2em] text-body lg:block">
              {AUTH_COPY.kicker}
            </p>
            <Link
              to="/"
              className="flex items-center gap-2 lg:hidden"
            >
              <img src={logo} alt="Đất Việt Group" className="h-9 w-9 rounded-xl object-contain" />
              <span className="font-medium text-heading">
                Đất Việt <span className="text-primary-600">Group</span>
              </span>
            </Link>
            <Link
              to={AUTH_COPY.supportHref}
              className="ml-auto inline-flex items-center gap-1.5 text-xs font-semibold text-heading hover:text-primary-600"
            >
              <HelpCircle size={16} className="text-primary-600" />
              {AUTH_COPY.support}
            </Link>
          </div>

          <div className="mx-auto flex w-full max-w-[450px] flex-1 flex-col justify-center py-10">
            {children}
          </div>

          <div className="flex items-center justify-between gap-4 text-[11px] text-body">
            <p>{AUTH_COPY.copyright}</p>
            <div className="flex items-center gap-1 font-bold">
              {(["VI", "EN"] as AuthLocale[]).map((code, i) => (
                <span key={code} className="flex items-center gap-1">
                  {i > 0 && <span className="text-muted">·</span>}
                  <button
                    type="button"
                    onClick={() => setLocale(code)}
                    className={locale === code ? "text-heading" : "text-heading hover:text-primary-600"}
                  >
                    {code}
                  </button>
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
