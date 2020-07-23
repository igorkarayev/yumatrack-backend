/* tslint:disable: no-magic-numbers */
import { BadRequestError } from '@errors/custom/http/badRequestError';

function roundDownTimestampToMinute(datetimeString: string): string {
  const datetime = new Date(datetimeString);
  datetime.setSeconds(0);
  datetime.setMilliseconds(0);

  const timestampInSeconds = datetime.getTime() / 1000;

  if (isNaN(timestampInSeconds)) {
    throw new BadRequestError('Invalid Date');
  }

  return timestampInSeconds.toString();
}

function convertToDatetime(timestamp: string): Date {
  const timestampInMilliseconds = +timestamp * 1000;
  return  new Date(timestampInMilliseconds);
}

function isElapsed10Seconds(date1: Date) {
  const date2 = new Date();
  return date2.getTime() - date1.getTime() > 10000;
}

export {
  roundDownTimestampToMinute,
  isElapsed10Seconds,
  convertToDatetime,
};
