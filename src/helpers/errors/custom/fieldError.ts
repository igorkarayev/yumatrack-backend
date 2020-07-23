import { ErrorCode, ErrorTarget } from '@constants/errors';
import { IFieldError } from '@helpers/http/responceInterface';

/**
 * @class FieldError
 */
export class FieldError
  extends Error
  implements IFieldError {
  public readonly code: ErrorCode;
  public readonly target: ErrorTarget.FIELD;

  public readonly source: {
    field: string;
    [key: string]: any;
  };

  /**
   * @param {string} message
   * @param {string} code
   * @param {object} source
   */
  constructor(message: string, code: ErrorCode, source: {
    field: string
  }) {
    super();

    // @ts-ignore
    Error.captureStackTrace(this, this.constructor);
    Object.setPrototypeOf(this, FieldError.prototype);

    this.message = message;
    this.code = code;
    this.source = source;
    this.target = ErrorTarget.FIELD;
  }
}
