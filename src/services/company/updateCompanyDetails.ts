import { CustomEntityManager } from '@typeorm/customEntityManager';
import { CompanyUpdateRequest } from '@validation/company/companyUpdateRequest';
import { Company } from '@entities/company';

export async function updateCompanyDetails(companyId: string, newCompanyDetails: CompanyUpdateRequest) {
  const entityManager: CustomEntityManager = await CustomEntityManager.getEntityManager();
  const companyRepository = entityManager.getCompanyRepository();
  const company: Company = await companyRepository.findCompanyByIdOrFail(companyId);

  Object.keys(newCompanyDetails).forEach(key => {
    if (newCompanyDetails[key] !== undefined) {
      company[key] = newCompanyDetails[key];
    }
  });
  company.updatedAt = new Date();

  await entityManager.save(company);
}
