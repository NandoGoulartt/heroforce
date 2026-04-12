import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProjects, type Project } from '../../api/projects';
import { getUsers, type User } from '../../api/users';

type StoredUser = {
  id: string;
  name: string;
  email: string;
  character: string;
  role: 'ADMIN' | 'USER';
};

type ProjectStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | '';

function formatStatus(status: Exclude<ProjectStatus, ''>) {
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

export default function DashboardPage() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState<Project[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState<StoredUser | null>(null);

  const [nameFilter, setNameFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<ProjectStatus>('');
  const [responsibleFilter, setResponsibleFilter] = useState('');

  const isAdmin = user?.role === 'ADMIN';

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch {
        // pode ignorar por enquanto
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
        setError('Não foi possível carregar os projetos');
      } finally {
        setIsLoading(false);
      }
    }

    loadProjects();
  }, [nameFilter, statusFilter, responsibleFilter, isAdmin]);

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">HeroForce</h1>
            <p className="text-sm text-slate-600">
              Painel de projetos heroicos
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-900">
                {user?.name ?? 'Usuário'}
              </p>
              <p className="text-xs text-slate-500">
                {user?.character} • {user?.role}
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Projetos</h2>
            <p className="text-sm text-slate-600">
              Visualize o andamento das missões e suas metas.
            </p>
          </div>

          <div className={`grid gap-3 ${isAdmin ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Buscar por nome da missão
              </label>
              <input
                type="text"
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                placeholder="Ex: Salvar Metrópolis"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-slate-900"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Filtrar por status
              </label>
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value as ProjectStatus)
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-slate-900"
              >
                <option value="">Todos</option>
                <option value="PENDING">Pendente</option>
                <option value="IN_PROGRESS">Em andamento</option>
                <option value="COMPLETED">Concluído</option>
              </select>
            </div>

            {isAdmin && (
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Filtrar por herói
                </label>
                <select
                  value={responsibleFilter}
                  onChange={(e) => setResponsibleFilter(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-slate-900"
                >
                  <option value="">Todos</option>
                  {users.map((listedUser) => (
                    <option key={listedUser.id} value={listedUser.id}>
                      {listedUser.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {isLoading && (
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-600">Carregando projetos...</p>
          </div>
        )}

        {error && !isLoading && (
          <div className="rounded-2xl bg-red-50 p-6 text-sm text-red-700 shadow-sm">
            {error}
          </div>
        )}

        {!isLoading && !error && projects.length === 0 && (
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-600">
              Nenhum projeto encontrado.
            </p>
          </div>
        )}

        {!isLoading && !error && projects.length > 0 && (
          <div className="grid gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >
                <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {project.name}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 text-sm text-slate-600 md:text-right">
                    <span>
                      <strong>Status:</strong>{' '}
                      {formatStatus(project.status)}
                    </span>
                    <span>
                      <strong>Progresso geral:</strong> {project.progress}%
                    </span>
                    <span>
                      <strong>Responsável:</strong> {project.responsible?.name}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="mb-3 text-sm font-semibold text-slate-800">
                    Metas da missão
                  </h4>

                  <div className="grid gap-3 md:grid-cols-2">
                    {project.goals.map((goal) => (
                      <div
                        key={`${project.id}-${goal.name}`}
                        className="rounded-xl border border-slate-200 p-4"
                      >
                        <div className="mb-2 flex items-center justify-between gap-3">
                          <p className="text-sm font-medium text-slate-900">
                            {goal.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            {goal.current}/{goal.target}
                          </p>
                        </div>

                        <div className="h-2 rounded-full bg-slate-200">
                          <div
                            className="h-2 rounded-full bg-slate-900"
                            style={{
                              width: `${Math.min(
                                (goal.current / goal.target) * 100,
                                100,
                              )}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}