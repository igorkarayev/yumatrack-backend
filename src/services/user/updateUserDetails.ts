import { CustomEntityManager } from '@typeorm/customEntityManager';
import { UserUpdateRequest } from '@validation/user/userUpdateRequest';
import { checkEmail } from '@services/user/checks/checkEmail';
import { User } from '@entities/user';

export async function updateUserDetails(userId: string, newUserDetails: UserUpdateRequest) {
  const entityManager: CustomEntityManager = await CustomEntityManager.getEntityManager();
  const user: User = await entityManager.getUserRepository().findUserByUserIdOrFail(userId);

  const newEmail = newUserDetails.email;

  if (newEmail) {
    await checkEmail(entityManager, newEmail);
  }

  Object.keys(newUserDetails).forEach(key => {
    if (newUserDetails[key] !== undefined) {
      user[key] = newUserDetails[key];
    }
  });

  user.updatedAt = new Date();

  await entityManager.save(user);
}
