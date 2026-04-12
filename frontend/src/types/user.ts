export type UserRole = 'ADMIN' | 'USER';

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  character: string;
  role: UserRole;
};

export type User = AuthUser & {
  createdAt: string;
  updatedAt: string;
};
