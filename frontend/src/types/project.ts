import type { UserRole } from './user';

export type ProjectStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

export type ProjectStatusFilter = ProjectStatus | '';

export type ProjectGoal = {
  name: string;
  target: number;
  current: number;
};

export type ProjectResponsible = {
  id: string;
  name: string;
  email: string;
  character: string;
  role: UserRole;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  progress: number;
  goals: ProjectGoal[];
  responsible: ProjectResponsible;
  createdAt: string;
  updatedAt: string;
};

export type ProjectPayload = {
  name: string;
  description: string;
  status: ProjectStatus;
  goals: {
    name: string;
    target: number;
    current: number;
  }[];
  progress: number;
  responsibleId: string;
};

export type GetProjectsFilters = {
  name?: string;
  status?: ProjectStatusFilter;
  responsibleId?: string;
};

export type UpdateGoalsPayload = {
  goals: {
    name: string;
    current: number;
  }[];
};
