import { User } from '@entities/user';
import { Role } from '@entities/role';
import { Company } from '@entities/company';
import { Permission } from '@entities/permission';

export function combinePermissions(user: User | undefined): Permission[] {
  if (!user) {
    return [];
  }

  const permissions: Permission[] = user.permissions || [];

  // Add roles permissions
  if (user.roles) {
    user.roles.map((userRole: Role) => permissions.concat(userRole.permissions));
  }

  // Add companies permissions
  if (user.companies) {
    user.companies.map((userCompany: Company) => permissions.concat(userCompany.permissions));
  }

  // Remove duplicate permissions
  return permissions.reduce((uniquePermissions: Permission[], permission: Permission) =>
    uniquePermissions.includes(permission) ? uniquePermissions : [...uniquePermissions, permission], []);
}
