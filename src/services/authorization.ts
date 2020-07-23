import { PermissionType } from '@entities/types';
import { Permission } from '@entities/permission';
import { Company } from '@entities/company';
import { AuthService } from './auth';

export class AuthorizationService {
  public company(sourcePermission: PermissionType, companyId: string): boolean {
    const permissions: Permission[] = AuthService.getPermissions() ?? [];
    const { name, grant } = sourcePermission;
    return permissions.some((permission: Permission) => (
      permission.name === name
      && permission.ep.value >= grant
      && permission.companies.map((c: Company) => c.id).includes(companyId)
    ));
  }
}

export const authorizationService = new AuthorizationService();
