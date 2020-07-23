import { Company } from '@entities/company';

export function serializeCompanyDetails(company: Company) {
  return {
    id: company.id,
    name: company.name,
    status: company.status,
  };
}
