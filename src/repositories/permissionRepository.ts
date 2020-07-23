import { EntityRepository, Repository } from 'typeorm';
import { Permission } from '@entities/permission';

@EntityRepository(Permission)
export class PermissionRepository extends Repository<Permission> {
  public async getPermission(): Promise<Permission | undefined> {
    const permission: Permission | undefined = await this.createQueryBuilder().getOne();

    if (!permission) {
      // throw error
    }

    return permission;
  }
}
