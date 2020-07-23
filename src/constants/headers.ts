/* tslint:disable: object-literal-key-quotes */
const contentType = {
  textHTML: {'Content-Type': 'text/html; charset=UTF-8'},
  textPlain: {'Content-Type': 'text/plain; charset=UTF-8'},
  applicationJSON: {'Content-Type': 'application/json'}
};

const contentLength = {
  zero: {'Content-Length': '0'}
};

const cacheControl = {
  noCacheNoStoreRevalidateAgeZero: {'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0'}
};

const expires = {
  zero: {'Expires': '0'}
};

export {
  contentType,
  contentLength,
  cacheControl,
  expires
};
