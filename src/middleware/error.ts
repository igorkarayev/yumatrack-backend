import { NextFunction, Request, Response } from 'express';
import { logger } from '@services/logger';
import { handleError } from '@errors/handle/handleError';
import { HttpCode } from '@constants/httpCode';
import { ErrorCode, ErrorTarget } from '@constants/errors';
import { IResponce } from '@helpers/http/responceInterface';

export const errorMiddleware = (e: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error('error handler middleware', {
    error: JSON.stringify(e),
    message: e.message,
    stack: e.stack && e.stack.split('\n'),
  });

  try {
    const response: IResponce = handleError(e);
    res.status(response.statusCode);
    res.send(response.body);
  } catch (error) {
    logger.error('response error: ', {
      message: error.message,
      type: error.errorType || e.constructor.name,
      stack: error.stack.split('\n')
    });
    res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
      errors: [{
        code: ErrorCode.INTERNAL_SERVER_ERROR,
        target: ErrorTarget.COMMON,
        message: 'INTERNAL_SERVER_ERROR'
      }]
    });
  }
};
