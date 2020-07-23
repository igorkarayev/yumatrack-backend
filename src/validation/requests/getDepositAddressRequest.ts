import { IsString, IsNotEmpty, IsUUID, IsBoolean, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';
import { ValidateableObject } from '@validation/validateableObject';

export class GetDepositAddressRequest extends ValidateableObject {
  @Expose()
  @IsNotEmpty()
  @IsUUID()
  public readonly companiesCounterpartyIdFrom: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  public readonly asset: string;

  @Expose()
  @IsOptional()
  @IsBoolean()
  public readonly isNew: boolean;
}
