import { ErrorCode, ErrorTarget } from '@constants/errors';
import { ICustomError } from '@errors/custom/misc/customErrorInterface';

/**
 * Thrown when no result could be found in methods which are not allowed to return undefined or an empty set.
 *
 * @class ForbiddenError
 */
export class ForbiddenError extends Error implements ICustomError {
  public readonly code: ErrorCode;
  public readonly target: string;
  public readonly message: string;

  /**
   *
   * @param {string} message
   */
  public constructor(message?: string) {
    super();

    Error.captureStackTrace(this, this.constructor);
    Object.setPrototypeOf(this, ForbiddenError.prototype);

    this.message =  message ? message : 'Forbidden or No Permission to Access';
    this.code = ErrorCode.FORBIDDEN;
    this.target = ErrorTarget.COMMON;
  }
}
