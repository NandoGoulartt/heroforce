import type {
  GetProjectsFilters,
  Project,
  ProjectPayload,
  UpdateGoalsPayload,
} from '../types';
import { api } from './api';

export type {
  Project,
  ProjectGoal,
  ProjectPayload,
} from '../types';

export async function getProjects(filters?: GetProjectsFilters) {
  const { data } = await api.get<Project[]>('/projects', {
    params: {
      name: filters?.name?.trim() || undefined,
      status: filters?.status || undefined,
      responsibleId: filters?.responsibleId || undefined,
    },
  });

  return data;
}

export async function getProjectById(id: string) {
  const { data } = await api.get<Project>(`/projects/${id}`);

  return data;
}

export async function createProject(payload: ProjectPayload) {
  const { data } = await api.post<Project>('/projects', payload);

  return data;
}

export async function updateProject(id: string, payload: Partial<ProjectPayload>) {
  const { data } = await api.patch<Project>(`/projects/${id}`, payload);

  return data;
}

export async function updateProjectGoals(id: string, payload: UpdateGoalsPayload) {
  const { data } = await api.patch<Project>(`/projects/${id}/goals`, payload);

  return data;
}

export async function deleteProject(id: string) {
  await api.delete(`/projects/${id}`);
}
