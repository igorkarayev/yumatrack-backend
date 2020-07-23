import { CustomEntityManager } from '@typeorm/customEntityManager';
import { User } from '@entities/user';
import { AlreadyExists } from '@errors/custom/alreadyExists';

export async function checkEmail(entityManager: CustomEntityManager,
                                 email: string) {
  if (email) {
    const user: User | undefined = await entityManager.getUserRepository().findUserByEmail(email);
    if (user) {
      throw new AlreadyExists('User', { email });
    }
  }
}
