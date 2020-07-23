import { ValidateableObject } from '@validation/validateableObject';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CompanyUpdateRequest extends ValidateableObject {
  @Expose()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public readonly name: string;
}
