import { ErrorCode, ErrorTarget } from '@constants/errors';
import { ICustomError } from '@errors/custom/misc/customErrorInterface';

/**
 * Thrown when no result could be found in methods which are not allowed to return undefined or an empty set.
 *
 * @class TFAFailedError
 */
export class TFAFailedError extends Error implements ICustomError {
  public readonly code: ErrorCode;
  public readonly target: string;
  public readonly message: string;

  /**
   *
   * @param {string} message
   */
  public constructor(message?: string, code?: ErrorCode) {
    super();

    Error.captureStackTrace(this, this.constructor);
    Object.setPrototypeOf(this, TFAFailedError.prototype);

    this.message =  message ? message : 'Two-Factor Authentication Failed Error';
    this.code = code || ErrorCode.TFA_FAILED;
    this.target = ErrorTarget.COMMON;
  }
}
