import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { ValidateableObject } from '@validation/validateableObject';

export class SetNewPasswordByTokenRequest extends ValidateableObject {
  @Expose()
  @IsString()
  @IsNotEmpty()
  public readonly token: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  public readonly password: string;
}
