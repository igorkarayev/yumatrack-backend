import { Request } from 'express';
import { CompanyCreateRequest } from '@validation/company/companyCreateRequest';
import { UserCreateRequest } from '@validation/user/userCreateRequest';
import { createCompany } from '@services/company/createCompany';
import { createUser } from '@services/user/createUser';
import { CustomEntityManager } from '@typeorm/customEntityManager';
import { Roles, Statuses } from '@entities/enums';
import { Role } from '@entities/role';
import { UserCredentials } from '@entities/types';

export async function createCompanyWithAdmin(req: Request): Promise<UserCredentials> {
  const entityManager: CustomEntityManager = await CustomEntityManager.getEntityManager();
  const roleRepository = entityManager.getRoleRepository();
  const roleAdmin: Role = await roleRepository.getRoleByName(Roles.CADMIN);

  const newCompany = new CompanyCreateRequest(req.body);
  const newUser = new UserCreateRequest({
    roleId: roleAdmin.id,
    status: Statuses.NOT_CONNECTED,
    ...req.body,
  });

  let credentials: UserCredentials | any;

  await entityManager.transaction(async transactionalEM => {
    const company = await createCompany(newCompany, transactionalEM);
    credentials = await createUser(newUser, company.id, transactionalEM);
  });

  return credentials;
}
