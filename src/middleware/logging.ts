import { NextFunction, Request, Response } from 'express';
import { logger } from '@services/logger';
import { parseJSON } from '@helpers/jsonHelpers';

export const loggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { method, path, headers, body } = req;
  if (!path.includes('/services/health')) {
    logger.debug('incoming request', {method, path, headers, body});
  }
  let responseBody: string;
  const originSend = res.send;
  // tslint:disable-next-line:no-function-expression only-arrow-functions
  res.send = function (resBody: any) {
    responseBody = resBody;
    // tslint:disable-next-line:no-invalid-this
    return originSend.call(this, resBody);
  };

  res.on('finish', () => {
    try {
      // NOTE bug here: responseBody isn't guaranteed to be set at this point
      responseBody = parseJSON(responseBody);
    } catch (e) {
      responseBody = '';
    }
    // exclude health check
    if (!path.includes('services/health')) {
      logger.debug('outgoing response', {
        status: res.statusCode,
        headers: res.getHeaders(),
        body: responseBody
      });
    }
  });

  next();
};
