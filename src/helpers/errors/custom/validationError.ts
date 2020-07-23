import { ErrorCode, ErrorTarget } from '@constants/errors';
import { ICustomError } from '@errors/custom/misc/customErrorInterface';

/**
 * @class ValidationError
 */
export class ValidationError
  extends Error
  implements ICustomError {
  public readonly code: ErrorCode;
  public readonly target: string;

  public source: object;

  /**
   * @param {string} message
   * @param {string} code
   * @param {string} target
   */
  constructor(message: string, code?: ErrorCode, target?: string) {
    super();

    Error.captureStackTrace(this, this.constructor);
    Object.setPrototypeOf(this, ValidationError.prototype);

    this.message = message;
    this.code = code || ErrorCode.COMMON;
    this.target = target || ErrorTarget.COMMON;
  }

  /**
   * @param {object} params
   */
  public addSource(params: object) {
    if (!this.source) {
      this.source = {};
    }

    Object.assign(this.source, params);

    return this;
  }
}
