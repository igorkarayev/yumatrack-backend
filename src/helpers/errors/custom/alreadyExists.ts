import { ObjectType } from 'typeorm/common/ObjectType';
import { ErrorCode, ErrorTarget } from '@constants/errors';
import { ICustomError } from '@errors/custom/misc/customErrorInterface';

/**
 * @class AlreadyExists
 */
export class AlreadyExists extends Error implements ICustomError {
  public readonly code: ErrorCode;
  public readonly target: string;
  public readonly source: object;

  /**
   *
   * @param {ObjectType<{ name: string }> | string} entityClass
   * @param {object} privateCriteria
   */
  public constructor(entityClass: ObjectType<{ name: string }> | string, privateCriteria: object) {
    super();

    Error.captureStackTrace(this, this.constructor);
    Object.setPrototypeOf(this, AlreadyExists.prototype);

    this.message = 'Already Exists';
    this.code = ErrorCode.ALREADY_EXISTS;
    this.target = ErrorTarget.COMMON;
    this.source = {
      type: (typeof entityClass === 'string') ? entityClass : entityClass.name,
      ...privateCriteria
    };
  }
}
