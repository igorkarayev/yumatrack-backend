import { ErrorCode, ErrorTarget } from '@constants/errors';
import { ICustomError } from '@errors/custom/misc/customErrorInterface';

/**
 * @class QueryFailedError
 */
export class QueryFailedError extends Error implements ICustomError {
  public readonly code: ErrorCode;
  public readonly target: string;
  public readonly source: object;

  /**
   *
   * @param {string} message
   */
  public constructor(message?: string) {
    super();

    Error.captureStackTrace(this, this.constructor);
    Object.setPrototypeOf(this, QueryFailedError.prototype);

    this.message =  message ? message : 'Query Failed Error';
    this.code = ErrorCode.QUERY_FAILED;
    this.target = ErrorTarget.COMMON;
  }
}
