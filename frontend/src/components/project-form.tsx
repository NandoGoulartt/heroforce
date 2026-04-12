import { useState } from 'react';
import type {
  ProjectPayload,
  ProjectStatus,
  User,
} from '../types';

type ProjectFormProps = {
  users: User[];
  initialValues?: ProjectPayload;
  isSubmitting?: boolean;
  submitLabel?: string;
  onSubmit: (values: ProjectPayload) => Promise<void> | void;
};

const inputClass =
  'w-full rounded-xl border border-slate-500/25 bg-hero-elevated/80 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-amber-500/45 focus:ring-2 focus:ring-amber-500/15';

const labelClass = 'mb-2 block text-sm font-medium text-slate-300';

export function ProjectForm({
  users,
  initialValues,
  isSubmitting = false,
  submitLabel = 'Salvar',
  onSubmit,
}: ProjectFormProps) {
  const [name, setName] = useState(initialValues?.name ?? '');
  const [description, setDescription] = useState(initialValues?.description ?? '');
  const [status, setStatus] = useState<ProjectStatus>(
    initialValues?.status ?? 'PENDING',
  );
  const [progress, setProgress] = useState<number>(initialValues?.progress ?? 0);
  const [responsibleId, setResponsibleId] = useState(
    initialValues?.responsibleId ?? '',
  );
  const [goals, setGoals] = useState(
    initialValues?.goals ?? [{ name: '', target: 1, current: 0 }],
  );
  const [error, setError] = useState('');

  function handleGoalChange(
    index: number,
    field: 'name' | 'target' | 'current',
    value: string,
  ) {
    setGoals((prev) =>
      prev.map((goal, currentIndex) =>
        currentIndex === index
          ? {
              ...goal,
              [field]:
                field === 'name'
                  ? value
                  : Number(value),
            }
          : goal,
      ),
    );
  }

  function addGoal() {
    setGoals((prev) => [...prev, { name: '', target: 1, current: 0 }]);
  }

  function removeGoal(index: number) {
    setGoals((prev) => prev.filter((_, currentIndex) => currentIndex !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Informe o nome da missão');
      return;
    }

    if (!description.trim()) {
      setError('Informe a descrição da missão');
      return;
    }

    if (!responsibleId) {
      setError('Selecione o herói responsável');
      return;
    }

    if (goals.length === 0) {
      setError('Adicione pelo menos uma meta');
      return;
    }

    const hasInvalidGoal = goals.some(
      (goal) => !goal.name.trim(),
    );

    if (hasInvalidGoal) {
      setError('Preencha o nome de todas as metas');
      return;
    }

    const hasInvalidTarget = goals.some(
      (goal) => !Number.isFinite(goal.target) || goal.target < 1,
    );

    if (hasInvalidTarget) {
      setError('Cada meta precisa de um valor alvo maior que zero');
      return;
    }

    const hasInvalidCurrent = goals.some(
      (goal) => !Number.isFinite(goal.current) || goal.current < 0,
    );

    if (hasInvalidCurrent) {
      setError('O valor atingido de cada meta não pode ser negativo');
      return;
    }

    await onSubmit({
      name: name.trim(),
      description: description.trim(),
      status,
      progress: Number(progress),
      responsibleId,
      goals: goals.map((goal) => ({
        name: goal.name.trim(),
        target: Number(goal.target),
        current: Number(goal.current),
      })),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error ? (
        <div className="rounded-xl border border-red-500/25 bg-red-950/40 p-4 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className={labelClass}>
            Nome da missão
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            placeholder="Ex: Salvar Metrópolis"
          />
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>
            Descrição
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className={inputClass}
            placeholder="Descreva a missão"
          />
        </div>

        <div>
          <label className={labelClass}>
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as ProjectStatus)}
            className={inputClass}
          >
            <option value="PENDING">Pendente</option>
            <option value="IN_PROGRESS">Em andamento</option>
            <option value="COMPLETED">Concluído</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>
            Progresso geral
          </label>
          <input
            type="number"
            min={0}
            max={100}
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            className={inputClass}
          />
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>
            Herói responsável
          </label>
          <select
            value={responsibleId}
            onChange={(e) => setResponsibleId(e.target.value)}
            className={inputClass}
          >
            <option value="">Selecione</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-100">Metas da missão</h3>
            <p className="mt-1 text-xs text-slate-500">
              Use números absolutos (ex.: pessoas resgatadas). A porcentagem é calculada automaticamente.
            </p>
          </div>
          <button
            type="button"
            onClick={addGoal}
            className="rounded-xl border border-slate-500/30 px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/5"
          >
            Adicionar meta
          </button>
        </div>

        <div className="space-y-4">
          {goals.map((goal, index) => (
            <div
              key={index}
              className="grid gap-3 rounded-2xl border border-slate-500/20 bg-hero-elevated/40 p-4 md:grid-cols-4"
            >
              <div className="md:col-span-2">
                <label className={labelClass}>
                  Nome da meta
                </label>
                <input
                  type="text"
                  value={goal.name}
                  onChange={(e) =>
                    handleGoalChange(index, 'name', e.target.value)
                  }
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Meta alvo
                </label>
                <input
                  type="number"
                  min={1}
                  step={1}
                  value={goal.target}
                  onChange={(e) =>
                    handleGoalChange(index, 'target', e.target.value)
                  }
                  className={inputClass}
                  placeholder="Ex.: 250"
                />
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
                    handleGoalChange(index, 'current', e.target.value)
                  }
                  className={inputClass}
                  placeholder="Ex.: 120"
                />
              </div>

              <div className="flex justify-end md:col-span-4">
                <button
                  type="button"
                  onClick={() => removeGoal(index)}
                  disabled={goals.length === 1}
                  className="rounded-xl border border-red-500/30 px-3 py-2 text-sm font-medium text-red-300 transition hover:bg-red-950/40 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Remover meta
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_24px_-4px_rgba(245,158,11,0.45)] transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? 'Salvando...' : submitLabel}
      </button>
    </form>
  );
}
