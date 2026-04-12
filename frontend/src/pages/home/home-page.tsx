import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { hasValidSession } from '../../utils/session';

export default function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (hasValidSession()) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-500/20 bg-hero-panel/40 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              HeroForce
            </h1>
            <p className="text-sm text-slate-400">
              Gestão de missões heroicas com foco em progresso e excelência.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="rounded-xl border border-slate-500/35 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/5"
            >
              Cadastro
            </button>

            <button
              type="button"
              onClick={() => navigate('/login')}
              className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-[0_0_20px_-4px_rgba(245,158,11,0.5)] transition hover:bg-amber-400"
            >
              Login
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex rounded-full border border-amber-500/25 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-300">
              Plataforma HeroForce
            </span>

            <h2 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              Organize missões, acompanhe metas e entregue resultados heroicos.
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-400">
              Uma plataforma para heróis e administradores acompanharem missões,
              progresso e metas com clareza, agilidade e eficiência.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="rounded-2xl bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_28px_-4px_rgba(245,158,11,0.55)] transition hover:bg-amber-400"
              >
                Criar conta
              </button>

              <button
                type="button"
                onClick={() => navigate('/login')}
                className="rounded-2xl border border-slate-500/35 px-5 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/5"
              >
                Já tenho conta
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-500/20 bg-hero-panel/50 p-6 shadow-[0_0_48px_-12px_rgba(245,158,11,0.12)] backdrop-blur-md">
            <div className="grid gap-4">
              <div className="rounded-2xl border border-slate-500/20 bg-hero-elevated/60 p-5">
                <p className="text-sm text-slate-500">Missões ativas</p>
                <p className="mt-2 text-3xl font-bold text-white">12</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-500/20 bg-hero-elevated/60 p-5">
                  <p className="text-sm text-slate-500">Em andamento</p>
                  <p className="mt-2 text-2xl font-bold text-amber-400">7</p>
                </div>

                <div className="rounded-2xl border border-slate-500/20 bg-hero-elevated/60 p-5">
                  <p className="text-sm text-slate-500">Concluídas</p>
                  <p className="mt-2 text-2xl font-bold text-emerald-400">5</p>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-500/20 bg-hero-elevated/60 p-5">
                <p className="text-sm text-slate-500">Valores</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[
                    'Agilidade',
                    'Encantamento',
                    'Eficiência',
                    'Excelência',
                    'Transparência',
                    'Ambição',
                  ].map((value) => (
                    <span
                      key={value}
                      className="rounded-full border border-slate-500/25 bg-slate-800/50 px-3 py-1 text-xs text-slate-300"
                    >
                      {value}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
