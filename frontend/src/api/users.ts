import { api } from './api';

export type User = {
  id: string;
  name: string;
  email: string;
  character: string;
  role: 'ADMIN' | 'USER';
  createdAt: string;
  updatedAt: string;
};

export async function getUsers() {
  const token = localStorage.getItem('token');

  const { data } = await api.get<User[]>('/users', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}