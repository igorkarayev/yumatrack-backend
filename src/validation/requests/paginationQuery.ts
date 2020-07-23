import { ValidateableObject } from '@validation/validateableObject';
import { Expose } from 'class-transformer';
import { DefaultValueDecorator } from '@validation/customValidation/defaultValueDecorator';

export class PaginationQuery extends ValidateableObject {
  // page number
  @Expose()
  // tslint:disable-next-line:no-magic-numbers
  @DefaultValueDecorator(1)
  public readonly page: number;

  // items per page
  @Expose()
  // tslint:disable-next-line:no-magic-numbers
  @DefaultValueDecorator(10)
  public readonly limit: number;
}
