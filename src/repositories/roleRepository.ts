import { EntityRepository, Repository } from 'typeorm';
import { Role } from '@entities/role';
import { Roles } from '@entities/enums';
import { EntityNotFoundError } from '@errors/custom/entityNotFoundError';

@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {
  public async getRole(): Promise<Role | undefined> {
    const role: Role | undefined = await this.createQueryBuilder().getOne();

    if (!role) {
      throw new EntityNotFoundError('Role', { text: 'Role is not found' });
    }

    return role;
  }

  public async getRoleByName(roleName: Roles) {
    const role = await this.findOne({
      where: {
        role: roleName,
      },
    });

    if (!role) {
      throw new EntityNotFoundError('Role', { text: 'Role is not found' });
    }

    return role;
  }
}
