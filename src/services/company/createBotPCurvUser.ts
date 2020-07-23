import { UserCreateRequest } from '@validation/user/userCreateRequest';
import { RoleRepository } from '@repositories/roleRepository';
import { Roles, Statuses } from '@entities/enums';
import { createUser } from '@services/user/createUser';
import { CompanyRepository } from '@repositories/companyRepository';
import { EntityManager } from 'typeorm';

export async function createBotPCurvUser(transactionalEM: EntityManager, companyId: string, botUserId: string) {
  const roleRepository: RoleRepository = transactionalEM.getCustomRepository(RoleRepository);
  const companyRepository: CompanyRepository = transactionalEM.getCustomRepository(CompanyRepository);

  const botPromise = roleRepository.getRoleByName(Roles.BOT);
  const companyPromise = companyRepository.findCompanyByIdOrFail(companyId);

  const [botRole, company] = await Promise.all([botPromise, companyPromise]);
  // generate email like bot@{uuid}.com without special symbols
  const email = `bot@${company.id.replace(/[^A-Z0-9]/ig, '')}.com`;
  const botUser = new UserCreateRequest({
    email,
    status: Statuses.ACTIVE,
    fullName: `Bot ${company.name}`,
    roleId: botRole.id,
    phone: '+375290000000'
  });
  await createUser(botUser, company.id, transactionalEM);
}
