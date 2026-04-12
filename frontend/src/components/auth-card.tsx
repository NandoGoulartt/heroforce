import { Link } from 'react-router-dom';

type AuthCardProps = {
  title: string;
  description: string;
  backHref?: string;
  children: React.ReactNode;
};

export function AuthCard({
  title,
  description,
  backHref = '/',
  children,
}: AuthCardProps) {
  return (
    <div className="flex min-h-screen flex-col px-4 py-10 sm:items-center sm:justify-center sm:py-12">
      <div className="mx-auto w-full max-w-md">
        {backHref ? (
          <div className="mb-6">
            <Link
              to={backHref}
              className="inline-flex items-center gap-2 text-sm font-medium text-amber-400/90 transition hover:text-amber-300"
            >
              <span aria-hidden>←</span>
              Voltar
            </Link>
          </div>
        ) : null}

        <div className="rounded-2xl border border-slate-500/20 bg-hero-panel/90 p-8 shadow-[0_0_48px_-12px_rgba(245,158,11,0.12)] backdrop-blur-md">
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-white">{title}</h1>
            <p className="mt-2 text-sm text-slate-400">{description}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
