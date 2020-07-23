import { ValidateableObject } from '@validation/validateableObject';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class IdTypeRequest extends ValidateableObject {
  @Expose()
  @IsNotEmpty()
  @IsUUID()
  public readonly id: string;
}
