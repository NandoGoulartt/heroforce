import type { AuthResponse, LoginPayload, RegisterPayload } from '../types';
import { api } from './api';

export type { AuthUser, LoginPayload, RegisterPayload } from '../types';

export async function login(payload: LoginPayload) {
  const { data } = await api.post<AuthResponse>('/auth/login', payload);

  localStorage.setItem('token', data.accessToken);
  localStorage.setItem('user', JSON.stringify(data.user));

  return data;
}

export async function register(payload: RegisterPayload) {
  const { data } = await api.post<AuthResponse>('/auth/register', payload);
  return data;
}
