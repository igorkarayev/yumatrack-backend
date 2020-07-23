import { Request, Response, NextFunction } from 'express';
import { AuthService } from '@services/auth';
import { CustomEntityManager } from '@typeorm/customEntityManager';
import { User } from '@entities/user';
import { AuthorizationFailedError } from '@errors/custom/authorizationFailedError';

export const attachCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const entityManager: CustomEntityManager = await CustomEntityManager.getEntityManager();
    const userRepository = entityManager.getUserRepository();
    const user: User | undefined = await userRepository.findUserByUserIdOrFail(AuthService.getUserId());
    if (!user) {
      next(new AuthorizationFailedError('User is not found'));
    }
    AuthService.setUser(user);

    return next();
  } catch (error) {
    next(error);
  }
};
