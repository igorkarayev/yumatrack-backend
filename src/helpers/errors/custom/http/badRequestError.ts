import { ErrorCode, ErrorTarget } from '@constants/errors';

export class BadRequestError extends Error {
  public code: string;
  public target: string;
  public message: string;

  constructor(message: string) {
    super();

    Error.captureStackTrace(this, this.constructor);
    Object.setPrototypeOf(this, BadRequestError.prototype);

    this.message = message;
    this.code = ErrorCode.BAD_REQUEST;
    this.target = ErrorTarget.COMMON;
  }
}
