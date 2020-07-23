import { CustomEntityManager } from '@typeorm/customEntityManager';
import { checkCompanyExistence } from '@services/company/checks/checkCompanyExistence';
import { Roles } from '@entities/enums';
import { User } from '@entities/user';

export async function getCAByCompany(companyId: string): Promise<User> {
  const entityManager: CustomEntityManager = await CustomEntityManager.getEntityManager();

  await checkCompanyExistence(entityManager, companyId);
  const userRepository = entityManager.getUserRepository();
  return userRepository.findUserByCompanyIdAndRole(companyId, Roles.CADMIN);
}
