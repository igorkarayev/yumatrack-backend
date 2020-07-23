/**
 * Error constants
 */
const enum ErrorCode {
  COMMON = 'common',
  UNAUTHORIZED = 'unauthorized',
  TOKEN_NOT_VALID = 'token_not_valid',
  ENTITY_NOT_FOUND = 'entity_not_found',
  PVURV_ENTITY_NOT_FOUND = 'pcurv_entity_not_found',
  ALREADY_EXISTS = 'already_exists',
  BAD_REQUEST = 'bad_request',
  DATA_IS_REQUIRED = 'data_is_required',
  INTERNAL_SERVER_ERROR = 'internal_server_error',
  NOT_FOUND = 'not_found',
  QUERY_FAILED = 'query_failed_error',
  FORBIDDEN = 'forbidden',
  CONNECTION_CREDENTIALS_NOT_VALID = 'connection_credentials_not_valid',
  TFA_FAILED = 'tfa_failed',
  TFA_CODE_NOT_VALID = 'tfa_code_not_valid',
  TFA_NOT_ENABLED = 'tfa_not_enabled',
  TFA_NOT_PASSED = 'tfa_not_passed',
  COUNTERPARTY_ERROR = 'counterparty_error',
}

const enum ErrorTarget {
  COMMON = 'common',
  FIELD = 'field'
}

export {
  ErrorCode,
  ErrorTarget
};
