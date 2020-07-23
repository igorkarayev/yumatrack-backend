import { Router, Request, Response, NextFunction } from 'express';
import { HttpCode } from '@constants/httpCode';

const router = Router();

router.get(
  '/health',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(HttpCode.SUCCESS).send();
    } catch (e) {
      next(e);
    }
  },
);

export const serviceRouter = router;
