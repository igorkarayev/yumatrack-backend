import { ErrorCollection } from '@errors/custom/misc/errorCollection';
import { logger } from '@services/logger';
import { ICustomError, isCustomErrorInterface } from '@errors/custom/misc/customErrorInterface';
import { ResponseSingleError } from '@errors/custom/http/responseSingleError';
import { ErrorCode, ErrorTarget } from '@constants/errors';
import { snakeCase } from '@helpers/snakeCase';
import { ICommonError, IErrorResponse, IResponce } from '@helpers/http/responceInterface';
import { HttpCode } from '@constants/httpCode';

/**
 * Internal server error
 *
 * @param error
 * @param {number} code - default is 500
 */
export function internalErrorResp(error: Error, code?: number): IResponce {
  logger.error('internalErrorResp', error.message, JSON.stringify(error));
  const statusCode = code ? code : HttpCode.INTERNAL_SERVER_ERROR;
  const internalError: ICommonError = {
    code: ErrorCode.INTERNAL_SERVER_ERROR,
    target: ErrorTarget.COMMON,
    message: 'Internal Server Error'
  };

  return {
    statusCode, body: {
      errors: [internalError]
    }
  };
}

/**
 * Unauthorized error
 *
 *  * default statusCode is 401
 *
 * @param {Error} error
 * @returns {}
 */
export function unauthorizedErrorResp(error: ICustomError | Error): IResponce {
  return errorResp(error, HttpCode.UNAUTHORIZED);
}

/**
 * Forbidden error
 *
 *  * default statusCode is 403
 *
 * @param {Error} error
 * @returns {}
 */
export function forbiddenErrorResp(error: ICustomError | Error): IResponce {
  return errorResp(error, HttpCode.FORBIDDEN);
}

/**
 * Validation error
 *
 * default statusCode is 422
 *
 * @param {Error} error
 * @returns {}
 */
export function validationErrorResp(error: ICustomError | Error): IResponce {
  return errorResp(error, HttpCode.VALIDATION_ERROR);
}

/**
 * @param {ICustomError | Error} error
 * @returns {}
 */
export function notFoundErrorResp(error: ICustomError | Error): IResponce {
  return errorResp(error, HttpCode.NOT_FOUND);
}

export function responseConflictError(error: Error): IResponce {
  return errorResp(error, HttpCode.CONFLICT_ERROR);
}

/**
 * Bad request error
 *
 * statusCode is 400
 *
 * @param {Error} error
 * @returns {}
 */
export function badRequestErrorResp(error: ICustomError | Error): IResponce {
  return errorResp(error, HttpCode.BAD_REQUEST);
}

/**
 * @param {ErrorCollection} collection
 * @param {number} statusCode
 * @returns {}
 */
export function validationErrorCollectionResp(collection: ErrorCollection,
                                              statusCode?: number): IResponce {
  logger.error('Validation errors - collection', collection);
  const code: number = statusCode ? statusCode : HttpCode.VALIDATION_ERROR;

  return {
    statusCode: code,
    body: {
      errors: collection.errors
    }
  };
}

/**
 * @param {ICustomError | Error} error
 * @param {number} statusCode
 * @returns {}
 */
function errorResp(error: ICustomError | Error, statusCode: number): IResponce {
  let singleError: any;
  if (isCustomErrorInterface(error)) {
    singleError = new ResponseSingleError(<ICustomError>error);
  } else {
    singleError = new ResponseSingleError(<ErrorCode>snakeCase(error.constructor.name), ErrorTarget.COMMON, error.message);
  }
  const body: IErrorResponse = {
    errors: [singleError]
  };

  return { statusCode, body };
}
