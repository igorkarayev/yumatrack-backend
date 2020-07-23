import { CustomEntityManager } from '@typeorm/customEntityManager';
import { User } from '@entities/user';
import { Statuses } from '@entities/enums';

export async function setStatus(userId: string, status: string): Promise<void> {
  const entityManager: CustomEntityManager = await CustomEntityManager.getEntityManager();
  const userRepository = entityManager.getUserRepository();

  const user: User = await userRepository.findUserByUserIdOrFail(userId);

  user.status = <Statuses> status;
  user.updatedAt = new Date();

  await entityManager.save(user);
}
