import { Request, Response } from 'express';
import { logger } from '@services/logger';
import { HttpCode } from '@constants/httpCode';
import { ErrorCode, ErrorTarget } from '@constants/errors';

export const invalidUrl = (req: Request, res: Response) => {
  const { url, method } = req;
  logger.debug('Invalid URL: ', { method, url});
  res.status(HttpCode.NOT_FOUND).json({
    errors: [{
      code: ErrorCode.NOT_FOUND,
      target: ErrorTarget.COMMON,
      message: 'requested endpoint is not found'
    }]
  });
};
