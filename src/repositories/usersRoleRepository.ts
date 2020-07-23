import { EntityRepository, Repository } from 'typeorm';
import { UsersRole } from '@entities/usersRole';

@EntityRepository(UsersRole)
export class UsersRoleRepository extends Repository<UsersRole> {
  public async deleteUsersRole(userId: string, excluded: string[]) {
    await this.createQueryBuilder(UsersRole.name)
    .delete()
    .where('roleId IN (:...excluded)', { excluded })
    .andWhere('userId = :userId', { userId })
    .execute();
  }
}
