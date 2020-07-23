import { Company } from '@entities/company';
import { CompanyCreateRequest } from '@validation/company/companyCreateRequest';
import { CompanyStatuses } from '@entities/enums';

export function generateCompany(newCompany: CompanyCreateRequest): Company {
  const company = new Company();

  company.name = newCompany.name;
  company.status = <CompanyStatuses> newCompany.status;

  return company;
}
