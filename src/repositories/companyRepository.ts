import { EntityRepository, Repository } from 'typeorm';
import { Company } from '@entities/company';
import { EntityNotFoundError } from '@errors/custom/entityNotFoundError';
import { CompanyStatuses } from '@entities/enums';
import { User } from '@entities/user';

@EntityRepository(Company)
export class CompanyRepository extends Repository<Company> {
  public async findCompanies(): Promise<Company[]> {
    return this.createQueryBuilder(Company.name)
      .orderBy(`${Company.name}.createdAt`, 'ASC')
      .where(`${Company.name}.status != '${CompanyStatuses.INACTIVE}'`)
      .getMany();
  }

  public async findCompanyByIdOrFail(companyId: string): Promise<Company> {
    const company: Company | undefined = await this.createQueryBuilder(Company.name)
      .where(`${Company.name}.id = :companyId`, { companyId })
      .getOne();

    if (!company) {
      throw new EntityNotFoundError('Company', { text: 'Company is not found' });
    }

    return company;
  }

  public async findCompaniesByUserId(userId: string): Promise<Company[]> {
    return this.createQueryBuilder(Company.name)
      .innerJoin(`${Company.name}.users`, User.name)
      .where(`${User.name}.id = :userId`, { userId })
      .getMany();
  }
}
