import { ErrorCode, ErrorTarget } from '@constants/errors';
import { ICustomError } from '@errors/custom/misc/customErrorInterface';

/**
 * @class ConnectionCredentialsNotValidError
 */
export class ConnectionCredentialsNotValidError extends Error implements ICustomError {
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
    Object.setPrototypeOf(this, ConnectionCredentialsNotValidError.prototype);

    this.message =  message ? message : 'Connection Credentials Not Valid';
    this.code = ErrorCode.CONNECTION_CREDENTIALS_NOT_VALID;
    this.target = ErrorTarget.COMMON;
  }
}
