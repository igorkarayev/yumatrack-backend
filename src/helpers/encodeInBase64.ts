export const encodeInBase64 = (secret: string): string => (
  new Buffer(secret, 'binary').toString('base64')
);

export const isValidFormatCredentials = (key: string): boolean => (
  Buffer.from(key, 'base64').toString('base64') === key
);
