import { ErrorCode, ErrorTarget } from '@constants/errors';
import { ICustomError } from '@errors/custom/misc/customErrorInterface';

/**
 * Thrown when no result could be found in methods which are not allowed to return undefined or an empty set.
 *
 * @class TokenNotValidError
 */
export class TokenNotValidError extends Error implements ICustomError {
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
    Object.setPrototypeOf(this, TokenNotValidError.prototype);

    this.message =  message ? message : 'Token is not valid';
    this.code = ErrorCode.TOKEN_NOT_VALID;
    this.target = ErrorTarget.COMMON;
  }
}
