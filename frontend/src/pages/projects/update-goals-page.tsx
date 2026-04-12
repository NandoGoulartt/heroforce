import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProjectById, updateProjectGoals } from '../../api/projects';
import type { Project } from '../../types';
import { PageFrame } from '../../components/page-frame';
import { goalCompletionPercent } from '../../utils/goal-progress';

type GoalFormItem = {
  name: string;
  target: number;
  current: number;
};

const inputClass =
  'w-full rounded-xl border border-slate-500/25 bg-hero-elevated/80 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-amber-500/45 focus:ring-2 focus:ring-amber-500/15';

const labelClass = 'mb-2 block text-sm font-medium text-slate-300';

export default function UpdateGoalsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState<Project | null>(null);
  const [goals, setGoals] = useState<GoalFormItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadProject() {
      if (!id) return;

      try {
        setIsLoading(true);
        setError('');

        const data = await getProjectById(id);
        setProject(data);
        setGoals(
          data.goals.map((goal) => ({
            name: goal.name,
            target: goal.target,
            current: goal.current,
          })),
        );
      } catch {
        setError('Não foi possível carregar a missão');
      } finally {
        setIsLoading(false);
      }
    }

    loadProject();
  }, [id]);

  function handleGoalCurrentChange(index: number, value: string) {
    setGoals((prev) =>
      prev.map((goal, currentIndex) =>
        currentIndex === index
          ? {
              ...goal,
              current: Number(value),
            }
          : goal,
      ),
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!id) return;

    try {
      setIsSubmitting(true);
      setError('');

      await updateProjectGoals(id, {
        goals: goals.map((goal) => ({
          name: goal.name,
          current: Number(goal.current),
        })),
      });

      navigate('/dashboard');
    } catch {
      setError('Não foi possível atualizar as metas');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <PageFrame
      title="Atualizar metas"
      description="Atualize o progresso atual das metas da missão."
    >
      {error ? (
        <div className="mb-6 rounded-xl border border-red-500/25 bg-red-950/40 p-4 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      {isLoading ? (
        <p className="text-sm text-slate-400">Carregando missão...</p>
      ) : !project ? (
        <p className="text-sm text-slate-400">Missão não encontrada.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-2xl border border-slate-500/20 bg-hero-elevated/40 p-4">
            <h2 className="text-lg font-bold text-white">
              {project.name}
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              {project.description}
            </p>
          </div>

          <div className="space-y-4">
            {goals.map((goal, index) => (
              <div
                key={`${goal.name}-${index}`}
                className="rounded-2xl border border-slate-500/20 bg-hero-elevated/30 p-4"
              >
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-slate-100">
                    {goal.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Meta alvo: {goal.target}
                  </p>
                </div>

                <div>
                  <label className={labelClass}>
                    Valor atingido
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={1}
                    value={goal.current}
                    onChange={(e) =>
                      handleGoalCurrentChange(index, e.target.value)
                    }
                    className={inputClass}
                  />
                  <p className="mt-2 text-xs text-amber-400/90">
                    {Math.round(
                      goalCompletionPercent(goal.current, goal.target),
                    )}
                    % da meta ({goal.current} / {goal.target})
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="rounded-xl border border-slate-500/35 px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/5"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-amber-500 px-4 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_24px_-4px_rgba(245,158,11,0.45)] transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? 'Salvando...' : 'Salvar metas'}
            </button>
          </div>
        </form>
      )}
    </PageFrame>
  );
}
