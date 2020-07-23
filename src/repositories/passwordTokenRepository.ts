
import { EntityRepository, Repository } from 'typeorm';
import { PasswordToken } from '@entities/passwordToken';

@EntityRepository(PasswordToken)
export class PasswordTokenRepository extends Repository<PasswordToken> {}
