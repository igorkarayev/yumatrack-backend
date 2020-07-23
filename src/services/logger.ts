import { config as baseConfig } from '@src/config';
import { createLogger } from '@helpers/logger/logger';
import { Logger } from 'winston';
import { getRequestId } from '@middleware/session';

process.stdout.isTTY = true;

if (process.env.LOG_LEVEL) {
  process.env.CLIENT_CW_LOG_LEVEL = process.env.LOG_LEVEL;
}

const logConfig = {
  ...baseConfig.LOGGING,
  LABEL_DECORATOR: () => getRequestId() || 'global'
};

export const logger: Logger = createLogger(logConfig);
