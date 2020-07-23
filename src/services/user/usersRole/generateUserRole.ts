import { User } from '@entities/user';
import { UsersRole } from '@entities/usersRole';

export function generateUserRole(user: User, roleId: string): UsersRole {
  const usersRole = new UsersRole();

  usersRole.user = user;
  usersRole.roleId = roleId;

  return usersRole;
}
