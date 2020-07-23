// tslint:disable-next-line:no-import-side-effect
import 'reflect-metadata';
import { Connection, createConnection, getConnection } from 'typeorm';
import * as ormconfig from '@src/ormconfig';
import { config } from '@src/config';
import { logger } from '@services/logger';

const connector = async (): Promise<Connection> => {
  let connection: Connection | undefined;

  try {
    connection = getConnection(config.DATABASE.CONNECTION_NAME);
  } catch (e) {
    // empty
  }

  try {
    if (!connection) {
      // tslint:disable-next-line: no-angle-bracket-type-assertion
      return createConnection(<any>{ ...ormconfig, name: config.DATABASE.CONNECTION_NAME });
    }
    return connection;
  } catch (e) {
    logger.error(e.message, e);
    throw e;
  }
};

export {
  connector,
};
