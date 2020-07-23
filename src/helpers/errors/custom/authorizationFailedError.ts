import { ErrorCode, ErrorTarget } from '@constants/errors';
import { ICustomError } from '@errors/custom/misc/customErrorInterface';

/**
 * Thrown when no result could be found in methods which are not allowed to return undefined or an empty set.
 *
 * @class AuthorizationFailedError
 */
export class AuthorizationFailedError extends Error implements ICustomError {
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
    Object.setPrototypeOf(this, AuthorizationFailedError.prototype);

    this.message =  message ? message : 'Authorization Failed Error';
    this.code = ErrorCode.UNAUTHORIZED;
    this.target = ErrorTarget.COMMON;
  }
}
