import { ValidateableObject } from '@validation/validateableObject';
import { Expose } from 'class-transformer';
import {IsNotEmpty, IsString, IsEmail, IsMobilePhone, IsOptional} from 'class-validator';
import {Statuses} from '@entities/enums';

export class UserCreateRequest extends ValidateableObject {
  @Expose()
  @IsString()
  @IsNotEmpty()
  public readonly roleId: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  public readonly fullName: string;

  @Expose()
  @IsEmail()
  @IsNotEmpty()
  public readonly email: string;

  @Expose()
  @IsString()
  @IsOptional()
  public readonly password: string;

  @Expose()
  @IsMobilePhone('any')
  @IsNotEmpty()
  public readonly phone: string;

  @Expose()
  @IsString()
  @IsOptional()
  public readonly status: Statuses;
}
