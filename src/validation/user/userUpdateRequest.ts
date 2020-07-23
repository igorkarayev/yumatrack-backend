import { ValidateableObject } from '@validation/validateableObject';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, IsEmail, IsMobilePhone, IsUUID } from 'class-validator';
import { IsNotSelfUpdating } from '@validation/customValidation/checkPermissionToUpdate';

export class UserUpdateRequest extends ValidateableObject {
  @Expose()
  @IsNotEmpty()
  @IsUUID()
  public readonly userId: string;

  @Expose()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public readonly fullName: string;

  @Expose()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public readonly tradingName: string;

  @Expose()
  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  @IsNotSelfUpdating('userId')
  public readonly email: string;

  @Expose()
  @IsOptional()
  @IsMobilePhone('any')
  @IsNotEmpty()
  @IsNotSelfUpdating('userId')
  public readonly phone: string;
}
