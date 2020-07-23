import { ValidateableObject } from '@validation/validateableObject';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsIn } from 'class-validator';
import { CompanyStatuses } from '@entities/enums';

export class CompanyStatusTypeRequest extends ValidateableObject {
  @Expose()
  @IsNotEmpty()
  @IsIn([CompanyStatuses.ACTIVE, CompanyStatuses.INACTIVE])
  public readonly status: string;
}
