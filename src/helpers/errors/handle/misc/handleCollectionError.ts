import { ErrorCollection } from '@errors/custom/misc/errorCollection';
import { validationErrorCollectionResp } from '@helpers/http/errors';
import { IResponce } from '@helpers/http/responceInterface';

/**
 * @param {ErrorCollection} e
 * @returns {}
 */
export function handleCollectionError(e: ErrorCollection): IResponce {
  return validationErrorCollectionResp(e);
}
