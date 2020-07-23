import { ErrorCollection } from '@errors/custom/misc/errorCollection';
import { FieldError } from '@errors/custom/fieldError';

/**
 * @class FieldErrorCollection
 */
export class FieldErrorCollection extends ErrorCollection {
  /**
   * @param {ValidationError[]} fieldErrors
   */
  public constructor(fieldErrors: FieldError[]) {
    super();

    if (!fieldErrors.length) {
      new Error('FieldError[] is empty');
    }

    this.errors = fieldErrors;
  }
}
