import { ValidateableObject } from '@validation/validateableObject';
import { Expose, Exclude } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

@Exclude()
export class PasswordChangeRequest extends ValidateableObject {
  @Expose()
  @IsString()
  @IsNotEmpty()
  public readonly currentPassword: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  public readonly newPassword: string;
}
