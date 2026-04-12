import type { AuthUser } from '../types';

export function clearSession() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

export function getStoredUser(): AuthUser | null {
  const raw = localStorage.getItem('user');
  if (!raw) return null;
  try {
    const user = JSON.parse(raw) as AuthUser;
    if (!user?.id || !user?.email) return null;
    return user;
  } catch {
    return null;
  }
}

export function hasValidSession(): boolean {
  const token = localStorage.getItem('token')?.trim();
  if (!token) return false;
  return getStoredUser() !== null;
}
