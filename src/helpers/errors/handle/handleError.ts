import { ErrorCollection } from '@errors/custom/misc/errorCollection';
import { handleCollectionError } from '@errors/handle/misc/handleCollectionError';
import { handleSingleError } from '@errors/handle/misc/handleSingleError';
import { IResponce } from '@helpers/http/responceInterface';

/**
 * @param {Error} e
 * @returns {}
 */
export function handleError(e: Error | ErrorCollection): IResponce {
  if (e instanceof ErrorCollection) {
    return handleCollectionError(<ErrorCollection>e);
  } else {
    return handleSingleError(<Error>e);
  }
}
