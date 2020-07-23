import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Company } from '@entities/company';
import { Roles, Statuses } from '@entities/enums';
import { CustomEntityManager } from '@typeorm/customEntityManager';
import { RoleRepository } from '@repositories/roleRepository';
import { config } from '@src/config';
import { createUser } from '@services/user/createUser';
import { UserCreateRequest } from '@src/validation/user/userCreateRequest';
import { UserRepository } from '@repositories/userRepository';

// tslint:disable-next-line:no-default-export
export default class CreateSuperAdmin implements Seeder {
  public async run(factory: Factory, connection: Connection) {
    const entityManager: CustomEntityManager = await CustomEntityManager.getEntityManager();
    const roleRepository: RoleRepository = entityManager.getRoleRepository();
    const userRepository: UserRepository = entityManager.getUserRepository();

    const role = await roleRepository.getRoleByName(Roles.SADMIN);

    if (!role) {
      throw new Error(`SuperAdmin role does not exist in database`);
    }

    const superAdminEmail = config.SEED.SUPER_ADMIN_EMAIL ?? 'admin@test.com';
    const superAdminPassword = config.SEED.SUPER_ADMIN_PASSWORD;

    if (await userRepository.findUserByEmail(superAdminEmail)) {
      return;
    }

    const company = await factory(Company)().make({});
    await connection.manager.save(company);

    if (!superAdminPassword || !superAdminEmail) {
      throw new Error(
        `'SUPER_ADMIN_PASSWORD' and 'SUPER_ADMIN_EMAIL' config variables should be defined`
      );
    }

    const newUser = new UserCreateRequest({
      email: superAdminEmail,
      status: Statuses.ACTIVE,
      fullName: 'Super Admin',
      roleId: role.id,
      password: superAdminPassword,
      phone: '+375290000000',
    });
    await createUser(newUser, company.id);
  }
}
