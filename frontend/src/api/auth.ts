import { api } from './api';

type LoginPayload = {
  email: string;
  password: string;
};

type LoginResponse = {
  accessToken: string;
  user: {
    id: string;
    name: string;
    email: string;
    character: string;
    role: 'ADMIN' | 'USER';
  };
};

export async function login(payload: LoginPayload) {
  const { data } = await api.post<LoginResponse>('/auth/login', payload);
  return data;
}