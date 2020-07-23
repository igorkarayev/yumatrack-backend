// tslint:disable-next-line
import Faker from 'faker';
import {define} from 'typeorm-seeding';
import {CompanyStatuses} from '@entities/enums';
import {Company} from '@entities/company';

define(Company, (faker: typeof Faker, settings: { }) => {
  const company = new Company();
  company.name = 'Administrators';
  company.status = CompanyStatuses.ACTIVE;
  return company;
});
