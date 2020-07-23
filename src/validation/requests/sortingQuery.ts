import { ValidateableObject } from '@validation/validateableObject';
import { Expose } from 'class-transformer';

export class SortingQuery extends ValidateableObject {
  @Expose()
  public readonly sort: string;
}
