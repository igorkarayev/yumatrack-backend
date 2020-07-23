import { NextFunction, Request, Response } from 'express';
import { Role } from '@entities/role';
import { Permission } from '@entities/permission';
import { AuthService } from '@services/auth';
import { combinePermissions } from '@services/permissionsCombine';
import { User } from '@entities/user';
import { ForbiddenError } from '@errors/forbiddenError';
import { PermissionType } from '@entities/types';
import { CustomEntityManager } from '@typeorm/customEntityManager';
import { Statuses } from '@entities/enums';

async function getUser(userId: string): Promise<User> {
  const entityManager: CustomEntityManager = await CustomEntityManager.getEntityManager();
  const userRepository = entityManager.getUserRepository();
  return userRepository.findUserWithDetailsByUserIdOrFail(userId);
}

export const authorize = (
  roles: string[] = [],
  permissions: PermissionType[] = []
) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (roles.length + permissions.length === 0) {
      next();
    }

    const userId = AuthService.getUserId();
    const sessionRoles = AuthService.getUserRoles();
    const sessionPermissions = AuthService.getPermissions();
    const sessionStatus = AuthService.getUserStatus();
    const user: User | undefined = (!sessionRoles || !sessionPermissions) ? await getUser(userId) : undefined;

    const userRoles = sessionRoles || user?.roles;
    const userPermissions = sessionPermissions || combinePermissions(user);
    const userStatus = sessionStatus || user?.status;

    if (userStatus === Statuses.BLOCKED) {
      throw new ForbiddenError('This user is blocked');
    }

    if (roles.length > 0) {
      if (!userRoles) {
        throw new ForbiddenError('This user is not added or roles are not set');
      }

      const accessGranted = userRoles.some((role: Role) => {
        return roles.includes(role.role);
      });
      if (!accessGranted) {
        throw new ForbiddenError();
      }
    }

    if (permissions.length > 0) {
      if (!userPermissions) {
        throw new ForbiddenError('This user is not added or permissions are not set');
      }

      const accessGranted = userPermissions.find((permission: Permission) => {
        return permissions.some((p: PermissionType) =>
          p.name === permission.name
          && p.grant <= permission.ep?.value);
      });
      if (!accessGranted) {
        throw new ForbiddenError();
      }
    }
  } catch (err) {
    next(err);
  }
  next();
};
