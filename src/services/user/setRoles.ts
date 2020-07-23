import { User } from '@entities/user';
import { RolesConfiguratuonRequest } from '@validation/user/rolesConfigurationRequest';
import { CustomEntityManager } from '@typeorm/customEntityManager';
import { generateUserRole } from '@services/user/usersRole/generateUserRole';
import { UsersRoleRepository } from '@repositories/usersRoleRepository';
import { UsersRole } from '@entities/usersRole';
import { QueryFailedError } from '@errors/custom/queryFailedError';

export async function setRoles(userId: string, rolesRequest: RolesConfiguratuonRequest) {
  const entityManager: CustomEntityManager = await CustomEntityManager.getEntityManager();
  const userRepository = entityManager.getUserRepository();

  const user: User = await userRepository.findUserWithDetailsByUserIdOrFail(userId);
  const currentRoleIds: string[] = user.roles.map(role => role.id);

  const { included, excluded } = rolesRequest;

  const uniqueIncludedRoleIds = [...new Set(included.filter(e => currentRoleIds.indexOf(e) === -1))];

  const includedRoles: UsersRole[] = uniqueIncludedRoleIds.map(roleId => generateUserRole(user, roleId));

  try {
    await entityManager.transaction(async transactionalEM => {
      const transactionArray: Promise<any>[] = [];
      if (includedRoles.length) {
        transactionArray.push(transactionalEM.save(includedRoles));
      }
      if (excluded.length) {
        transactionArray.push(
          transactionalEM.getCustomRepository(UsersRoleRepository).deleteUsersRole(user.id, excluded)
        );
      }
      await Promise.all(transactionArray);
    });
  } catch (error) {
    if (error.name === 'QueryFailedError') {
      throw new QueryFailedError(error.message);
    }
    throw new Error(error);
  }
}
