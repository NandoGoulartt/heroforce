import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProject } from '../../api/projects';
import { getUsers } from '../../api/users';
import type { ProjectPayload, User } from '../../types';
import { PageFrame } from '../../components/page-frame';
import { ProjectForm } from '../../components/project-form';

export default function CreateProjectPage() {
  const navigate = useNavigate();

  const [users, setUsers] = useState<User[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch {
        setError('Não foi possível carregar os heróis');
      } finally {
        setIsLoadingUsers(false);
      }
    }

    loadUsers();
  }, []);

  async function handleSubmit(values: ProjectPayload) {
    try {
      setIsSubmitting(true);
      setError('');

      await createProject(values);
      navigate('/dashboard');
    } catch {
      setError('Não foi possível criar a missão');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <PageFrame
      title="Nova missão"
      description="Crie uma nova missão heroica."
    >
      {error ? (
        <div className="mb-6 rounded-xl border border-red-500/25 bg-red-950/40 p-4 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      {isLoadingUsers ? (
        <p className="text-sm text-slate-400">Carregando heróis...</p>
      ) : (
        <ProjectForm
          users={users}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          submitLabel="Criar missão"
        />
      )}
    </PageFrame>
  );
}
