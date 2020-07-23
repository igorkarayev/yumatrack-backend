import { ValidateableObject } from '@validation/validateableObject';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsIn } from 'class-validator';
import { Statuses } from '@entities/enums';

export class StatusTypeRequest extends ValidateableObject {
  @Expose()
  @IsNotEmpty()
  @IsIn([Statuses.ACTIVE, Statuses.BLOCKED])
  public readonly status: string;
}
