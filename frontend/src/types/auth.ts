import type { AuthUser } from './user';

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  character: string;
};

export type AuthResponse = {
  accessToken: string;
  user: AuthUser;
};
