import { ConnectionOptions } from 'typeorm';
import { CustomNamingStrategy } from '@typeorm/customNamingStrategy';
import { config } from '@src/config';

// tslint:disable-next-line:no-angle-bracket-type-assertion no-object-literal-type-assertion
module.exports = <ConnectionOptions>{
  type: config.DATABASE.TYPEORM_CONNECTION,
  host: config.DATABASE.TYPEORM_HOST,
  port: Number(config.DATABASE.TYPEORM_PORT),
  username: config.DATABASE.TYPEORM_USERNAME,
  password: config.DATABASE.TYPEORM_PASSWORD,
  database: config.DATABASE.TYPEORM_DATABASE,
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
  logging: true,
  namingStrategy: new CustomNamingStrategy(),
};
