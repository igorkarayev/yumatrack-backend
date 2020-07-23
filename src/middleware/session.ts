import { NextFunction, Request, Response } from 'express';
import { random } from '@helpers/random';
import { session } from '@services/session';

export function setRequestId(requestId: string): void {
  session.set('requestId', requestId);
}

export function getRequestId(): string {
  return session.get('requestId');
}

export const sessionMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Create a new session scope, and set the requestId for logging metadata
  session.run(() => {
    // Request ID
    const requestId = req.get('x-yuma-request-id') || random.uuid4();
    setRequestId(requestId);
    next();
  });
};
