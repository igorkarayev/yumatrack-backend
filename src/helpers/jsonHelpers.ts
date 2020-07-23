import { logger } from '@services/logger';
import { BadRequestError } from '@errors/custom/http/badRequestError';

export const isJsonString = (string: string): boolean => {
  try {
    JSON.parse(string);
  } catch (e) {
    return false;
  }
  return true;
};

export function parseJSON(json: string | null | object): any {
  if (json === null) {
    logger.warn('parseJSON passed null');
    throw new BadRequestError('Invalid json');
  }
  if (typeof json === 'object') {
    return json;
  }
  try {
    return JSON.parse(json);
  } catch (e) {
    if (json) {
      logger.warn('parseJSON', json);
    }
    throw new BadRequestError(e.message);
  }
}
