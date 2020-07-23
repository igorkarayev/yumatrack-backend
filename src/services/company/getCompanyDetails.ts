import { CustomEntityManager } from '@typeorm/customEntityManager';
import { Company } from '@entities/company';
import { serializeCompanyDetails } from '@services/company/serialization/serializeCompanyDetails';

export async function getCompanyDetails(companyId: string) {
  const entityManager: CustomEntityManager = await CustomEntityManager.getEntityManager();
  const companyRepository = entityManager.getCompanyRepository();
  const company: Company = await companyRepository.findCompanyByIdOrFail(companyId);

  return serializeCompanyDetails(company);
}
