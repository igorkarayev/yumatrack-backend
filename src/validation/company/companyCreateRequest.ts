import { ValidateableObject } from '@validation/validateableObject';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, IsIn, IsOptional } from 'class-validator';
import { CompanyStatuses } from '@entities/enums';

export class CompanyCreateRequest extends ValidateableObject {
  @Expose()
  @IsString()
  @IsNotEmpty()
  public readonly name: string;

  @Expose()
  @IsNotEmpty()
  @IsIn([CompanyStatuses.ACTIVE, CompanyStatuses.INACTIVE])
  @IsOptional()
  public readonly status: string;
}
