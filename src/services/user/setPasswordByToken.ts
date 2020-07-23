import { EntityManager } from 'typeorm';
import { CustomEntityManager } from '@typeorm/customEntityManager';
import { passwordTokenService } from '@services/passwordToken';
import { makePasswordHash } from '@services/auth';
import { Statuses } from '@entities/enums';
import { UserRepository } from '@repositories/userRepository';

export async function setPasswordByToken(token: string, newPlainPasssword: string): Promise<boolean> {
  const entityManager = await CustomEntityManager.getEntityManager();
  return entityManager.transaction(async (transactionEntityManager: EntityManager) => {
    const passwordToken = await passwordTokenService.findPasswordToken(
      transactionEntityManager,
      token,
    );
    if (!passwordToken) {
      return false;
    }
    if (passwordTokenService.isTokenExpired(passwordToken)) {
      await passwordTokenService.removePasswordToken(transactionEntityManager, passwordToken);
      return false;
    }
    const usersRepository = entityManager.getCustomRepository(UserRepository);
    await Promise.all([
      passwordTokenService.removePasswordToken(transactionEntityManager, passwordToken),
      usersRepository.update(passwordToken.userId, {
        password: await makePasswordHash(newPlainPasssword),
        status: Statuses.ACTIVE,
      }),
    ]);
    return true;
  });
}
