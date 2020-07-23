import { FieldError } from '@errors/custom/fieldError';
import { snakeCase } from '@helpers/snakeCase';
import { ValidationError } from 'class-validator';
import { ErrorCode } from '@constants/errors';

/**
 * @class FieldErrorFactory
 */
export class FieldErrorFactory {
  /**
   * @param {ValidationError} error
   * @param {string} key
   * @param {string} property
   * @returns {FieldError}
   */
  public createByValidatorError(error: ValidationError, key: string, property: string): FieldError {
    const message: string = error.constraints[key];
    const code: string = snakeCase(key);
    const field: string = property;

    return this.create(message, <ErrorCode>code, {field});
  }

  /**
   * @param {string} message
   * @param {string} code
   * @param {object} source
   * @returns {FieldError}
   */
  public create(message: string, code: ErrorCode, source: {field: string}): FieldError {
    return new FieldError(message, code, source);
  }
}
