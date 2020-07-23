import { UserCreateRequest } from '@validation/user/userCreateRequest';
import { User } from '@entities/user';
import { UserCreator } from '@services/user/creator/userCreator';
import { AuthService } from '@services/auth';
import { UsersCompany } from '@entities/usersCompany';
import { UsersRole } from '@entities/usersRole';
import { CustomEntityManager } from '@typeorm/customEntityManager';
import { checkEmail } from '@services/user/checks/checkEmail';
import { EntityManager } from 'typeorm';
import { UserCredentials } from '@entities/types';

export async function createUser(
  newUser: UserCreateRequest,
  companyId?: string | undefined,
  tEM?: EntityManager | undefined,
): Promise<UserCredentials> {
  const entityManager: CustomEntityManager = await CustomEntityManager.getEntityManager();

  await checkEmail(entityManager, newUser.email);

  const userFactory = new UserCreator(newUser);
  userFactory.setRole(newUser.roleId);
  const [user, usersCompany, usersRole]: [User, UsersCompany, UsersRole] = userFactory.create(companyId);

  await createAndNotifyUser(
    tEM ?? entityManager,
    user,
    usersCompany,
    usersRole,
  );

  return {
    id: user.id,
    companyId: companyId || '',
    email: user.email,
  };
}

async function createAndNotifyUser(
  entityManager: EntityManager,
  user: User,
  usersCompany: UsersCompany,
  usersRole: UsersRole,
): Promise<void> {
  await AuthService.signUp([user, usersCompany, usersRole], entityManager);
  // const passwordToken = await passwordTokenService.createPasswordToken(entityManager, user.id);
}
