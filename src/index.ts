import { app } from '@src/app';
import { config } from '@src/config';
import { logger } from '@services/logger';

app.listen(config.SERVICE_PORT, () => {
  logger.debug(`Server listening on port ${config.SERVICE_PORT}`);
});
