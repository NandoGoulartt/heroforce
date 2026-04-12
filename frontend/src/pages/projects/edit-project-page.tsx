import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProjectById, updateProject } from '../../api/projects';
import { getUsers } from '../../api/users';
import type { ProjectPayload, User } from '../../types';
import { PageFrame } from '../../components/page-frame';
import { ProjectForm } from '../../components/project-form';

export default function EditProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [users, setUsers] = useState<User[]>([]);
  const [initialValues, setInitialValues] = useState<ProjectPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadData() {
      if (!id) return;

      try {
        setIsLoading(true);
        setError('');

        const [project, usersData] = await Promise.all([
          getProjectById(id),
          getUsers(),
        ]);

        setUsers(usersData);
        setInitialValues({
          name: project.name,
          description: project.description,
          status: project.status,
          progress: project.progress,
          responsibleId: project.responsible.id,
          goals: project.goals.map((goal) => ({
            name: goal.name,
            target: goal.target,
            current: goal.current,
          })),
        });
      } catch {
        setError('Não foi possível carregar a missão');
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [id]);

  async function handleSubmit(values: ProjectPayload) {
    if (!id) return;

    try {
      setIsSubmitting(true);
      setError('');

      await updateProject(id, values);
      navigate('/dashboard');
    } catch {
      setError('Não foi possível atualizar a missão');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <PageFrame
      title="Editar missão"
      description="Atualize os dados da missão."
    >
      {error ? (
        <div className="mb-6 rounded-xl border border-red-500/25 bg-red-950/40 p-4 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      {isLoading || !initialValues ? (
        <p className="text-sm text-slate-400">Carregando missão...</p>
      ) : (
        <ProjectForm
          users={users}
          initialValues={initialValues}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          submitLabel="Salvar alterações"
        />
      )}
    </PageFrame>
  );
}
