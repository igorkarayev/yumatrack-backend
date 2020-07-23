import { NextFunction, Request, Response, Router } from 'express';
import { IdTypeRequest } from '@validation/requests/idTypeRequest';
import { UserUpdateRequest } from '@validation/user/userUpdateRequest';
import { UserCreateRequest } from '@src/validation/user/userCreateRequest';
import { getUserDetails } from '@services/user/getUserDetails';
import { updateUserDetails } from '@services/user/updateUserDetails';
import { createUser } from '@services/user/createUser';
import { authorize } from '@middleware/authorize';
import { Roles } from '@entities/enums';
import { HttpCode } from '@constants/httpCode';
import { wrapper } from '@helpers/wrapperData';
import { RolesConfiguratuonRequest } from '@validation/user/rolesConfigurationRequest';
import { setRoles } from '@services/user/setRoles';
import { StatusTypeRequest } from '@validation/user/statusTypeRequest';
import { setStatus } from '@services/user/setStatus';
import { resetPassword } from '@services/user/resetPassword';
import { UserCredentials } from '@entities/types';

const router = Router();

router.get(
  '/:userId',
  authorize([Roles.SADMIN, Roles.CADMIN, Roles.USER, Roles.GUEST]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const idRequest = new IdTypeRequest({ id: req.params.userId });
      const userDetails = await getUserDetails(idRequest.id);

      res.send(wrapper(userDetails));
    } catch (e) {
      next(e);
    }
  },
);

router.post(
  '/',
  authorize([Roles.SADMIN, Roles.CADMIN]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newUser = new UserCreateRequest(req.body);
      const credentials: UserCredentials = await createUser(newUser);

      res.send(wrapper(credentials));
    } catch (e) {
      next(e);
    }
  },
);

router.put(
  '/:userId',
  authorize([Roles.SADMIN, Roles.CADMIN, Roles.USER]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const idRequest = new IdTypeRequest({ id: req.params.userId });

      const newUserDetails = new UserUpdateRequest({
        userId: idRequest.id,
        ...req.body,
      });

      await updateUserDetails(idRequest.id, newUserDetails);

      res.status(HttpCode.NO_CONTENT).send();
    } catch (e) {
      next(e);
    }
  },
);

router.patch(
  '/:userId/reset',
  authorize([Roles.SADMIN, Roles.CADMIN, Roles.USER, Roles.GUEST]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const idRequest: IdTypeRequest = new IdTypeRequest({ id: req.params.userId });

      const credentials = await resetPassword(idRequest.id);

      res.send(wrapper(credentials));
    } catch (e) {
      next(e);
    }
  },
);

router.patch(
  '/:userId/role',
  authorize([Roles.SADMIN, Roles.CADMIN]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const idRequest = new IdTypeRequest({ id: req.params.userId });
      const rolesRequest = new RolesConfiguratuonRequest(req.body);

      await setRoles(idRequest.id, rolesRequest);

      res.status(HttpCode.NO_CONTENT).send();
    } catch (e) {
      next(e);
    }
  },
);

router.patch(
  '/:userId/status',
  authorize([Roles.SADMIN, Roles.CADMIN]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const idRequest = new IdTypeRequest({ id: req.params.userId });
      const statusRequest = new StatusTypeRequest(req.body);

      await setStatus(idRequest.id, statusRequest.status);

      res.status(HttpCode.NO_CONTENT).send();
    } catch (e) {
      next(e);
    }
  },
);

export const userRouter = router;
