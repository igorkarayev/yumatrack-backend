import { Router, Request, Response, NextFunction } from 'express';
import { PasswordChangeRequest } from '@validation/auth/passwordChangeRequest';
import { AuthService, TokenResponse } from '@services/auth';
import { HttpCode } from '@constants/httpCode';
import { isAuth } from '@middleware/auth';
import { SetNewPasswordByTokenRequest } from '@validation/user/setNewPasswordByTokenRequest';
import { setPasswordByToken } from '@services/user/setPasswordByToken';
import { AuthorizationFailedError } from '@errors/custom/authorizationFailedError';
import { wrapper } from '@helpers/wrapperData';
import { authorize } from '@middleware/authorize';
import { Roles } from '@entities/enums';
import { TokenNotValidError } from '@errors/custom/tokenNotValid';
import { validationErrorResp } from '@helpers/http/errors';

const router = Router();

router.post(
  '/login',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const token: TokenResponse = await AuthService.login(email, password);
      if (!token) {
        throw new TokenNotValidError('Token is not created');
      }
      res.send(wrapper(token));
    } catch (e) {
      next(e);
    }
  },
);

router.post(
  '/refresh',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.body;
      const token: TokenResponse = await AuthService.refresh(refreshToken);
      if (!token) {
        throw new AuthorizationFailedError('Token is not created');
      }
      res.send(wrapper(token));
    } catch (e) {
      next(e);
    }
  },
);

router.post(
  '/logout',
  isAuth,
  authorize([Roles.SADMIN, Roles.CADMIN, Roles.USER, Roles.GUEST]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.header('authorization');
      if (!token || !token.toLowerCase().includes('bearer ')) {
        throw new AuthorizationFailedError('Token is not found in your header');
      }
      await AuthService.logout(token.replace(/[Bb]earer /, ''));
      res.status(HttpCode.SUCCESS).send();
    } catch (e) {
      next(e);
    }
  },
);

router.put(
  '/password',
  isAuth,
  authorize([Roles.CADMIN, Roles.USER, Roles.GUEST]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const passwords = new PasswordChangeRequest(req.body);

      await AuthService.passwordChange(passwords);

      res.status(HttpCode.NO_CONTENT).send();
    } catch (e) {
      next(e);
    }
  },
);

router.post(
  '/password/set-by-token',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = new SetNewPasswordByTokenRequest(req.body);
      await payload.validateAsync();
      const isSuccess = await setPasswordByToken(payload.token, payload.password);
      if (!isSuccess) {
        const { statusCode, body } = validationErrorResp(new Error('Invalid token'));
        res.status(statusCode).json(body);
        return;
      }
      res.status(HttpCode.SUCCESS).send({});
    } catch (e) {
      next(e);
    }
  },
);

export const authRouter = router;
