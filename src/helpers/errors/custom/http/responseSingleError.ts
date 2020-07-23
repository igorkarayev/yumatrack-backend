import { ErrorCode, ErrorTarget } from '@constants/errors';
import { ICustomError, isCustomErrorInterface } from '@errors/custom/misc/customErrorInterface';

export class ResponseSingleError implements ICustomError {
  public readonly code: ErrorCode;
  public readonly target: string;
  public readonly message?: string;
  public readonly source?: object;

  constructor(code: ErrorCode | ICustomError, target?: string, message?: string) {
    if (typeof (code) === 'object' && isCustomErrorInterface(code)) {
      this.code = code.code;
      this.target = code.target;
      this.message = (<ICustomError>code).message;
      if (code.source) {
        const source: any = JSON.parse(JSON.stringify(code.source));
        if (source.hasOwnProperty('privateCriteria')) {
          delete source.privateCriteria;
        }

        this.source = source;
      }
    } else if (typeof (code) === 'string') {
      this.code = code;
      this.target = target ? target : ErrorTarget.COMMON;
      this.message = <string>message;
    }
  }
}
