import localJson from '@env/local.json';
import devJson from '@env/dev.json';
import prodJson from '@env/prod.json';

export enum Stage {
  DEV = 'dev',
  LOCAL = 'local',
  STAGING = 'staging',
  PRODUCTION = 'prod'
}

export const {
  STAGE = Stage.LOCAL,
  CLIENT_CW_LOG_LEVEL = null,
  CLIENT_S3_LOG_LEVEL = null,
  SERVICE_PORT = null,
  DATABASE = null,
  JWT = null,
  SEED = null,
  CRYPTOCOMPARE = null,
  CONFIGS = null,
  TWO_FACTOR_AUTHENTICATION_APP_NAME = null,
  PASSWORD_TOKEN = null,
} = process.env;

let baseConfig: any;
switch (STAGE) {
  case Stage.LOCAL:
    baseConfig = localJson;
    break;
  case Stage.DEV:
  case Stage.STAGING:
    baseConfig = devJson;
    break;
  case Stage.PRODUCTION:
    baseConfig = prodJson;
    break;
  default:
    throw new Error(`Unexpected process.env.STAGE: ${STAGE}`);
}

if (STAGE) {
  baseConfig.STAGE = STAGE;
}

if (CLIENT_CW_LOG_LEVEL) {
  baseConfig.LOGGING = {
    ...baseConfig.LOGGING,
    CLOUDWATCH: {
      LEVEL: CLIENT_CW_LOG_LEVEL,
      ...(baseConfig.LOGGING.CLOUDWATCH || {})
    }
  };
}

if (CLIENT_S3_LOG_LEVEL) {
  baseConfig.LOGGING = {
    ...baseConfig.LOGGING,
    S3: {
      LEVEL: CLIENT_S3_LOG_LEVEL,
      ...(baseConfig.LOGGING.S3 || {})
    }
  };
}

if (SERVICE_PORT) {
  baseConfig.SERVICE_PORT = SERVICE_PORT;
}

if (TWO_FACTOR_AUTHENTICATION_APP_NAME) {
  baseConfig.TWO_FACTOR_AUTHENTICATION_APP_NAME = TWO_FACTOR_AUTHENTICATION_APP_NAME;
}

if (DATABASE) {
  baseConfig.DATABASE = DATABASE;
}

if (JWT) {
  baseConfig.JWT = JWT;
}

if (SEED) {
  baseConfig.SEED = SEED;
}

if (CRYPTOCOMPARE) {
  baseConfig.CRYPTOCOMPARE = CRYPTOCOMPARE;
}

if (CONFIGS) {
  baseConfig = { ...baseConfig, ...JSON.parse(CONFIGS) };
}

if (PASSWORD_TOKEN) {
  baseConfig.PASSWORD_TOKEN = PASSWORD_TOKEN;
}

export const config = baseConfig;
