import { CustomEntityManager } from '@typeorm/customEntityManager';

export async function checkCompanyExistence(entityManager: CustomEntityManager, companyId: string) {
  await entityManager.getCompanyRepository().findCompanyByIdOrFail(companyId);
}
