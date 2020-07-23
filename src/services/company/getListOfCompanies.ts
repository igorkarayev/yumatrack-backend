import { CustomEntityManager } from '@typeorm/customEntityManager';
import { Company } from '@entities/company';
import { serializeCompanyDetails } from '@services/company/serialization/serializeCompanyDetails';

export async function getListOfCompanies() {
  const entityManager: CustomEntityManager = await CustomEntityManager.getEntityManager();
  const companyRepository = entityManager.getCompanyRepository();
  const companies: Company[] = await companyRepository.findCompanies();

  // tslint:disable-next-line:no-unnecessary-callback-wrapper
  return companies.map(company => serializeCompanyDetails(company));
}
