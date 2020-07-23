import { CustomEntityManager } from '@typeorm/customEntityManager';
import { User } from '@entities/user';

export async function setPCurvUserId(userId: string, userIdPCurv: string): Promise<void> {
  const entityManager: CustomEntityManager = await CustomEntityManager.getEntityManager();
  const userRepository = entityManager.getUserRepository();

  const user: User = await userRepository.findUserByUserIdOrFail(userId);

  user.userIdPcurv = userIdPCurv;
  user.updatedAt = new Date();

  await entityManager.save(user);
}
