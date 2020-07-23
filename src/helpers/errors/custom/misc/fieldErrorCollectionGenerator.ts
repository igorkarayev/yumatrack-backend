import { FieldErrorFactory } from '@errors/custom/misc/fieldErrorFactory';
import { FieldError } from '@errors/custom/fieldError';
import { ValidationError } from 'class-validator';

/**
 * @class FieldErrorCollectionGenerator
 */
export class FieldErrorCollectionGenerator {
  public fieldErrors: FieldError[];
  public factory: FieldErrorFactory;

  /**
   * @param {ValidationError[]} errors
   * @param {FieldErrorFactory} factory
   */
  public constructor(errors: ValidationError[], factory: FieldErrorFactory) {
    if (!errors.length) {
      new Error('ValidatorError[] is empty');
    }

    this.fieldErrors = [];
    this.factory = factory;

    this.generateErrors(errors);
  }

  /**
   * @returns {FieldError[]}
   */
  public getErrors(): FieldError[] {
    return this.fieldErrors;
  }

  /**
   * @param {ValidationError[]} errors
   */
  private generateErrors(errors: ValidationError[]): void {
    for (const error of errors) {
      this.generateErrorsByField(error);
    }
  }

  /**
   * @param {ValidationError} error
   * @param {string} parentProperty
   */
  private generateErrorsByField(error: ValidationError, parentProperty: string = ''): void {
    parentProperty = parentProperty ? parentProperty + '.' + error.property : error.property;
    if (error.constraints) {
      for (const key of Object.keys(error.constraints)) {
        this.fieldErrors.push(this.factory.createByValidatorError(error, key, parentProperty));
      }
    }
    if (error.children) {
      for (const children of error.children) {
        this.generateErrorsByField(children, parentProperty);
      }
    }
  }
}
