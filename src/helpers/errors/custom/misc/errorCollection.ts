/**
 * @abstract ErrorCollection
 */
import { IFieldError } from '@helpers/http/responceInterface';

export abstract class ErrorCollection {
  public errors: IFieldError[];

  public constructor() {
    this.errors = [];
  }
}
