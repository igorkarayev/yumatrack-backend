import { CustomEntityManager } from '@typeorm/customEntityManager';
import { serializeUserDetails } from '@services/user/serialization/serializeUserDetails';
import { User } from '@entities/user';

export async function getUserDetails(userId: string) {
  const entityManager: CustomEntityManager = await CustomEntityManager.getEntityManager();
  const userRepository = entityManager.getUserRepository();
  const user: User = await userRepository.findUserWithDetailsByUserIdOrFail(userId);

  return serializeUserDetails(user);
}
