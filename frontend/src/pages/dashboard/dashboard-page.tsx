import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  deleteProject,
  getProjects,
  type Project,
} from '../../api/projects';
import { getUsers, type User } from '../../api/users';
import type { AuthUser, ProjectStatus, ProjectStatusFilter } from '../../types';
import { goalCompletionPercent } from '../../utils/goal-progress';
import { clearSession, getStoredUser } from '../../utils/session';

function formatStatus(status: ProjectStatus) {
  switch (status) {
    case 'PENDING':
      return 'Pendente';
    case 'IN_PROGRESS':
      return 'Em andamento';
    case 'COMPLETED':
      return 'Concluído';
    default:
      return status;
  }
}

function formatUserRole(role: AuthUser['role'] | undefined) {
  if (role === 'ADMIN') return 'Administrador';
  if (role === 'USER') return 'Herói';
  return '';
}

const filterInputClass =
  'w-full rounded-xl border border-slate-500/25 bg-hero-elevated/80 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-amber-500/45 focus:ring-2 focus:ring-amber-500/15';

const filterLabelClass = 'mb-2 block text-sm font-medium text-slate-300';

export default function DashboardPage() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState<Project[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState<AuthUser | null>(null);

  const [nameFilter, setNameFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<ProjectStatusFilter>('');
  const [responsibleFilter, setResponsibleFilter] = useState('');

  const isAdmin = user?.role === 'ADMIN';

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch {
        setUsers([]);
      }
    }

    if (isAdmin) {
      loadUsers();
    }
  }, [isAdmin]);

  useEffect(() => {
    async function loadProjects() {
      try {
        setIsLoading(true);
        setError('');

        const data = await getProjects({
          name: nameFilter,
          status: statusFilter,
          responsibleId: isAdmin ? responsibleFilter : undefined,
        });

        setProjects(data);
      } catch {
        setError('Não foi possível carregar as missões');
      } finally {
        setIsLoading(false);
      }
    }

    loadProjects();
  }, [nameFilter, statusFilter, responsibleFilter, isAdmin]);

  function handleLogout() {
    clearSession();
    navigate('/login');
  }

  function handleCreateMission() {
    navigate('/projects/new');
  }

  function handleEditMission(projectId: string) {
    navigate(`/projects/${projectId}/edit`);
  }

  function handleUpdateGoals(projectId: string) {
    navigate(`/projects/${projectId}/goals`);
  }

  async function handleDeleteMission(projectId: string) {
    const confirmDelete = window.confirm(
      'Tem certeza que deseja excluir esta missão?',
    );

    if (!confirmDelete) return;

    try {
      await deleteProject(projectId);
      setProjects((prev) => prev.filter((project) => project.id !== projectId));
    } catch {
      alert('Não foi possível excluir a missão');
    }
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-500/20 bg-hero-panel/60 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 py-3.5 sm:px-6 sm:py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <div className="min-w-0 sm:py-0.5">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-white sm:text-2xl">
                HeroForce
              </h1>
              <p className="mt-0.5 text-sm leading-snug text-slate-400">
                Painel de missões heroicas
              </p>
            </div>

            <div className="flex min-w-0 w-full justify-stretch sm:w-auto sm:max-w-md sm:justify-end sm:self-center lg:max-w-lg">
              <div className="flex w-full min-w-0 items-stretch overflow-hidden rounded-xl border border-slate-500/30 bg-hero-elevated/55 shadow-inner shadow-black/20 sm:w-auto">
                <div className="flex min-w-0 flex-1 flex-col justify-center px-3 py-2 text-left sm:px-4 sm:py-2.5 sm:text-right">
                  <p className="truncate text-sm font-semibold leading-tight text-slate-100">
                    {user?.name ?? 'Herói'}
                  </p>
                  <p className="mt-0.5 line-clamp-2 text-xs leading-snug text-slate-500">
                    {user?.character ? `${user.character} · ` : ''}
                    {formatUserRole(user?.role)}
                  </p>
                </div>
                <div
                  className="hidden w-px shrink-0 self-stretch bg-slate-500/25 sm:block"
                  aria-hidden
                />
                <button
                  type="button"
                  onClick={handleLogout}
                  className="shrink-0 border-l border-slate-500/25 bg-slate-950/30 px-3 py-2 text-xs font-medium text-slate-200 transition hover:bg-amber-500/10 hover:text-amber-200 sm:px-4 sm:text-sm"
                >
                  Sair
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Missões</h2>
            <p className="text-sm text-slate-400">
              Visualize o andamento das missões e suas metas.
            </p>
          </div>

          <div className="flex w-full flex-col gap-4 md:max-w-none md:items-end">
            {isAdmin ? (
              <button
                type="button"
                onClick={handleCreateMission}
                className="w-full rounded-xl bg-amber-500 px-4 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_24px_-4px_rgba(245,158,11,0.45)] transition hover:bg-amber-400 md:w-auto"
              >
                Nova missão
              </button>
            ) : null}

            <div
              className={`grid w-full gap-3 ${
                isAdmin ? 'md:grid-cols-3' : 'md:grid-cols-2'
              }`}
            >
              <div>
                <label className={filterLabelClass}>
                  Buscar por nome da missão
                </label>
                <input
                  type="text"
                  value={nameFilter}
                  onChange={(e) => setNameFilter(e.target.value)}
                  placeholder="Ex: Salvar Metrópolis"
                  className={filterInputClass}
                />
              </div>

              <div>
                <label className={filterLabelClass}>
                  Filtrar por status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(e.target.value as ProjectStatusFilter)
                  }
                  className={filterInputClass}
                >
                  <option value="">Todos</option>
                  <option value="PENDING">Pendente</option>
                  <option value="IN_PROGRESS">Em andamento</option>
                  <option value="COMPLETED">Concluído</option>
                </select>
              </div>

              {isAdmin ? (
                <div>
                  <label className={filterLabelClass}>
                    Filtrar por herói
                  </label>
                  <select
                    value={responsibleFilter}
                    onChange={(e) => setResponsibleFilter(e.target.value)}
                    className={filterInputClass}
                  >
                    <option value="">Todos</option>
                    {users.map((listedUser) => (
                      <option key={listedUser.id} value={listedUser.id}>
                        {listedUser.name}
                      </option>
                    ))}
                  </select>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="rounded-2xl border border-slate-500/20 bg-hero-panel/50 p-6 backdrop-blur-sm">
            <p className="text-sm text-slate-400">Carregando missões...</p>
          </div>
        ) : null}

        {error && !isLoading ? (
          <div className="rounded-2xl border border-red-500/25 bg-red-950/40 p-6 text-sm text-red-200">
            {error}
          </div>
        ) : null}

        {!isLoading && !error && projects.length === 0 ? (
          <div className="rounded-2xl border border-slate-500/20 bg-hero-panel/50 p-6 backdrop-blur-sm">
            <p className="text-sm text-slate-400">
              Nenhuma missão encontrada.
            </p>
          </div>
        ) : null}

        {!isLoading && !error && projects.length > 0 ? (
          <div className="grid gap-6">
            {projects.map((project) => (
              <article
                key={project.id}
                className="rounded-2xl border border-slate-500/20 bg-hero-panel/60 p-6 shadow-[0_0_40px_-16px_rgba(0,0,0,0.5)] backdrop-blur-sm"
              >
                <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-bold text-white">
                      {project.name}
                    </h3>
                    <p className="mt-1 text-sm text-slate-400">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex shrink-0 flex-col gap-2 text-sm text-slate-400 lg:text-right">
                    <span>
                      <strong className="text-slate-300">Status:</strong>{' '}
                      {formatStatus(project.status)}
                    </span>
                    <span>
                      <strong className="text-slate-300">Progresso geral:</strong>{' '}
                      {project.progress}%
                    </span>
                    <span>
                      <strong className="text-slate-300">Herói responsável:</strong>{' '}
                      {project.responsible?.name}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="mb-3 text-sm font-semibold text-slate-200">
                    Metas da missão
                  </h4>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {project.goals.map((goal) => (
                      <div
                        key={`${project.id}-${goal.name}`}
                        className="rounded-xl border border-slate-500/20 bg-hero-elevated/40 p-4"
                      >
                        <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                          <p className="text-sm font-medium text-slate-100">
                            {goal.name}
                          </p>
                          <div className="text-right text-xs text-slate-400">
                            <p>
                              {goal.current} / {goal.target}
                            </p>
                            <p className="text-amber-400/90">
                              {Math.round(
                                goalCompletionPercent(
                                  goal.current,
                                  goal.target,
                                ),
                              )}
                              % da meta
                            </p>
                          </div>
                        </div>

                        <div className="h-2 rounded-full bg-slate-800">
                          <div
                            className="h-2 rounded-full bg-gradient-to-r from-amber-600 to-amber-400"
                            style={{
                              width: `${goalCompletionPercent(
                                goal.current,
                                goal.target,
                              )}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
                  {isAdmin ? (
                    <>
                      <button
                        type="button"
                        onClick={() => handleEditMission(project.id)}
                        className="rounded-xl border border-slate-500/35 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/5"
                      >
                        Editar missão
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteMission(project.id)}
                        className="rounded-xl border border-red-500/35 px-4 py-2 text-sm font-medium text-red-300 transition hover:bg-red-950/40"
                      >
                        Excluir
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleUpdateGoals(project.id)}
                      className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
                    >
                      Atualizar metas
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : null}
      </main>
    </div>
  );
}
