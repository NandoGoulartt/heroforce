import { api } from './api';

export type ProjectGoal = {
  name: string;
  target: number;
  current: number;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  progress: number;
  goals: ProjectGoal[];
  responsible: {
    id: string;
    name: string;
    email: string;
    character: string;
    role: 'ADMIN' | 'USER';
  };
  createdAt: string;
  updatedAt: string;
};

type GetProjectsFilters = {
  name?: string;
  status?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | '';
  responsibleId?: string;
};

export async function getProjects(filters?: GetProjectsFilters) {
  const token = localStorage.getItem('token');

  const { data } = await api.get<Project[]>('/projects', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      name: filters?.name?.trim() || undefined,
      status: filters?.status || undefined,
      responsibleId: filters?.responsibleId || undefined,
    },
  });

  return data;
}