import { ValidateableObject } from '@validation/validateableObject';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { IsUniqueArrayThan } from '@validation/customValidation/checkUniquenessOfArrays';

export class RolesConfiguratuonRequest extends ValidateableObject {
  @Expose()
  @IsUUID(undefined, { each: true })
  @IsNotEmpty()
  public readonly included: string[];

  @Expose()
  @IsUUID(undefined, { each: true })
  @IsNotEmpty()
  @IsUniqueArrayThan('included', {
    message: 'Included and excluded arrays must be unique'
  })
  public readonly excluded: string[];
}
