import { EntityNotFoundError } from '@errors/custom/entityNotFoundError';
import { AuthorizationFailedError } from '@errors/custom/authorizationFailedError';
import { ValidationError } from '@errors/custom/validationError';
import { FieldError } from '@errors/custom/fieldError';
import { BadRequestError } from '@errors/custom/http/badRequestError';
import { AlreadyExists } from '@errors/custom/alreadyExists';
import { QueryFailedError } from '@errors/custom/queryFailedError';
import { ConnectionCredentialsNotValidError } from '@errors/custom/connectionCredentialsNotValidError';
import {
  badRequestErrorResp,
  internalErrorResp,
  notFoundErrorResp,
  validationErrorResp,
  unauthorizedErrorResp,
  responseConflictError,
  forbiddenErrorResp
} from '@helpers/http/errors';
import { IResponce } from '@helpers/http/responceInterface';
import { ForbiddenError } from '@errors/forbiddenError';
import { TokenNotValidError } from '@errors/custom/tokenNotValid';

/**
 * @param {Error} e
 * @returns {}
 */
export function handleSingleError(e: Error): IResponce {
  switch (true) {
    case e instanceof AlreadyExists:
      return responseConflictError(e);
    case e instanceof EntityNotFoundError:
      return notFoundErrorResp(e);
    case e instanceof AuthorizationFailedError:
      return unauthorizedErrorResp(e);
    case e instanceof TokenNotValidError:
      return unauthorizedErrorResp(e);
    case e instanceof ForbiddenError:
      return forbiddenErrorResp(e);
    case e instanceof ValidationError:
    case e instanceof FieldError:
      return validationErrorResp(e);
    case e instanceof BadRequestError:
    case e instanceof QueryFailedError:
    case e instanceof ConnectionCredentialsNotValidError:
      return badRequestErrorResp(e);
    default:
      return internalErrorResp(e);
  }
}
