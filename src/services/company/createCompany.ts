import { CompanyCreateRequest } from '@validation/company/companyCreateRequest';
import { generateCompany } from '@services/company/generateCompany';
import { CustomEntityManager } from '@typeorm/customEntityManager';
import { serializeCompanyDetails } from '@services/company/serialization/serializeCompanyDetails';
import { EntityManager } from 'typeorm';

export async function createCompany(newCompany: CompanyCreateRequest, tEM?: EntityManager | undefined) {
  const entityManager: CustomEntityManager = await CustomEntityManager.getEntityManager();
  const company = generateCompany(newCompany);

  if (tEM) {
    await tEM.save(company);
  } else {
    await entityManager.save(company);
  }

  return serializeCompanyDetails(company);
}
