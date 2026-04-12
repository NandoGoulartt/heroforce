import { Link } from 'react-router-dom';

type PageFrameProps = {
  title: string;
  description?: string;
  backTo?: string;
  children: React.ReactNode;
};

export function PageFrame({
  title,
  description,
  backTo = '/dashboard',
  children,
}: PageFrameProps) {
  return (
    <div className="min-h-screen px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <Link
            to={backTo}
            className="inline-flex items-center gap-2 text-sm font-medium text-amber-400/90 transition hover:text-amber-300"
          >
            <span aria-hidden>←</span>
            Voltar
          </Link>
        </div>

        <div className="rounded-2xl border border-slate-500/20 bg-hero-panel/80 p-6 shadow-[0_0_40px_-12px_rgba(245,158,11,0.15)] backdrop-blur-md sm:p-8">
          <header className="mb-8 border-b border-slate-500/15 pb-6">
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {title}
            </h1>
            {description ? (
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {description}
              </p>
            ) : null}
          </header>
          {children}
        </div>
      </div>
    </div>
  );
}
