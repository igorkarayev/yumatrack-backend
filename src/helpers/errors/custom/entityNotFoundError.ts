import { ObjectType } from 'typeorm/common/ObjectType';
import { ErrorCode, ErrorTarget } from '@constants/errors';
import { ICustomError } from '@errors/custom/misc/customErrorInterface';

/**
 * Thrown when no result could be found in methods which are not allowed to return undefined or an empty set.
 *
 * @class EntityNotFoundError
 */
export class EntityNotFoundError extends Error implements ICustomError {
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

    // @ts-ignore
    Error.captureStackTrace(this, this.constructor);
    Object.setPrototypeOf(this, EntityNotFoundError.prototype);

    this.message = 'Entity Not Found';
    this.code = ErrorCode.ENTITY_NOT_FOUND;
    this.target = ErrorTarget.COMMON;
    this.source = {
      type: (typeof entityClass === 'string') ? entityClass : entityClass.name,
      ...privateCriteria
    };
  }
}
