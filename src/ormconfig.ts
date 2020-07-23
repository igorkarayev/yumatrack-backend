// import pg from 'pg';
import { ConnectionOptions } from 'typeorm';
import { CustomNamingStrategy } from '@typeorm/customNamingStrategy';
import { config } from '@src/config';
import { User } from '@entities/user';
import { Role } from '@entities/role';
import { Company } from '@entities/company';
import { Permission } from '@entities/permission';
import { UsersCompany } from '@entities/usersCompany';
import { UsersRole } from '@entities/usersRole';
import { Token } from '@entities/token';
import { EntityPermission } from '@entities/entityPermission';
import { PasswordToken } from '@entities/passwordToken';

// Workaround to escape timezone conversion
// @link: https://github.com/typeorm/typeorm/issues/2622#issuecomment-476416712
// tslint:disable-next-line:no-magic-numbers
// pg.types.setTypeParser(1114, (stringValue: string) => new Date(`${stringValue}+0000`));

// tslint:disable-next-line:no-angle-bracket-type-assertion no-object-literal-type-assertion
module.exports = <ConnectionOptions>{
  type: config.DATABASE.TYPEORM_CONNECTION,
  host: config.DATABASE.TYPEORM_HOST,
  port: Number(config.DATABASE.TYPEORM_PORT),
  username: config.DATABASE.TYPEORM_USERNAME,
  password: config.DATABASE.TYPEORM_PASSWORD,
  database: config.DATABASE.TYPEORM_DATABASE,
  entities: [
    User,
    Role,
    Company,
    Permission,
    UsersCompany,
    UsersRole,
    Token,
    EntityPermission,
    PasswordToken,
  ],
  synchronize: false,
  logging: true,
  namingStrategy: new CustomNamingStrategy(),
  seeds: ['src/database/seeds/*.seed.ts'],
  factories: ['src/database/factories/*.factory.ts'],
};
