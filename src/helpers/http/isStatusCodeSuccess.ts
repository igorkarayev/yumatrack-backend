/**
 * @param {number} statusCode
 * @returns {boolean}
 */
export function isStatusCodeSuccess(statusCode: number): boolean {
  return new RegExp('^2[0-9][0-9]$').test(statusCode.toString());
}
