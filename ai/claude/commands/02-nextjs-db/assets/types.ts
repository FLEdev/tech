export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export const userRoles = ['guest', 'user', 'admin'] as const;