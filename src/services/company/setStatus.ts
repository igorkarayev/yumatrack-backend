import { CustomEntityManager } from '@typeorm/customEntityManager';
import { CompanyStatuses } from '@entities/enums';
import { Company } from '@entities/company';

export async function setStatus(companyId: string, status: string): Promise<void> {
  const entityManager: CustomEntityManager = await CustomEntityManager.getEntityManager();
  const companyRepository = entityManager.getCompanyRepository();

  const company: Company = await companyRepository.findCompanyByIdOrFail(companyId);

  company.status = <CompanyStatuses> status;
  company.updatedAt = new Date();

  await entityManager.save(company);
}
