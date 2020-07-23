import * as util from 'util';
import * as winston from 'winston';
import { format, Format, TransformFunction } from 'logform';
import * as colors from 'colors/safe';
import { SPLAT, LEVEL, MESSAGE } from 'triple-beam';

import { DEFAULT_SCRUB_CONFIG } from './log-scrub-config';
// tslint:disable-next-line:no-duplicate-imports
import { Logger } from 'winston';

type FormatNames =
  'align'
  | 'cli'
  | 'colorize'
  | 'combine'
  | 'errors'
  | 'json'
  | 'label'
  | 'logstash'
  | 'metadata'
  | 'ms'
  | 'padLevels'
  | 'prettyPrint'
  | 'simple'
  | 'splat'
  | 'timestamp'
  | 'uncolorize';

interface LoggerOptions {
  // Cloud Watch logging level. First reading the level from environment variable CLIENT_CW_LOG_LEVEL than read it from options
  CLOUDWATCH?: {
    LEVEL: string;
  };
  // AWS S3 logging level. First reading the level from environment variable CLIENT_S3_LOG_LEVEL than read it from options
  S3?: {
    LEVEL: string;
    PATH?: string;
    BUCKET: string;
  };
  FORMAT?: FormatNames | FormatNames[];
  SCRUB?: RegExp[];
  PRETTY?: boolean;

  LABEL_DECORATOR(info: any): string;
}

const splatFormat = format.splat();
const labelFormat = format.label();

const PRETTY_SIMPLE = 'prettySimple';

// Redact replaces sensitive info with the word "REDACTED"
function createRedactor(regExArray: RegExp[], REDACTION_TEXT: string = 'REDACTED'): TransformFunction {
  return info => {
    if (!info[MESSAGE] || typeof info[MESSAGE] !== 'string') {
      return info;
    }
    const regExString = regExArray.map(re => re.source).join('|');
    const regEx = new RegExp(regExString, 'gi');
    return {
      ...info,
      message: info.message.replace(regEx, REDACTION_TEXT),
      [MESSAGE]: info[MESSAGE].replace(regEx, REDACTION_TEXT)
    };
  };
}

// The "simple" formatter, but prettier formatting of debug objects
winston.format[PRETTY_SIMPLE] = format(info => {
  const exclude = ['level', LEVEL, 'message', MESSAGE, 'splat', SPLAT];
  const rest = Object.keys(info).reduce((acc, cur) => {
    if (exclude.indexOf(cur) < 0) {
      acc[cur] = info[cur];
    }
    return acc;
  }, {});
  const stringifiedRest = util.inspect(rest, {
    colors: true,
    maxArrayLength: 10
  });
  const padding = (info.padding && info.padding[info.level]) || '';
  if (stringifiedRest !== '{}') {
    info[MESSAGE] = `${info.level}:${padding} ${info.message} ${stringifiedRest}`;
  } else {
    info[MESSAGE] = `${info.level}:${padding} ${info.message}`;
  }
  return info;
});

// This format is to support the case where we call logger.info('msg', primitiveType),
// where primitiveType is a variable holding a primitive type. In this case, default
// formatter assusme those are meta datas. In our case, we have those type of logs
// throughout our code base so instead of changing it everywhere, adding this formatter.
const legacySplatFormatter = format.printf((info: any) => {
  const splat = info[SPLAT] || info.splat;
  const msg = info.message || '';
  if (splat && splat.length && msg.indexOf('%') < 0 && typeof splat[0] !== 'object' && typeof splat[0] !== 'function') {
    info.message += ' %s';
    info = splatFormat.transform(info);
  }
  return info;
});

const createLabelFormatter = (config: LoggerOptions): Format => {
  return format.printf((info: any) => {
    let label;

    if (config.LABEL_DECORATOR) {
      label = config.LABEL_DECORATOR(info);
    }

    if (label) {
      info = labelFormat.transform(info, { label, message: true });
    }
    return info;
  });
};

function getFormats(config: LoggerOptions): Format[] {
  // Create formats list
  const formats: Format[] = [];

  // PRETTY explicitly set to true -OR- implied for LOCAL env
  const usePrettyFormatting = (config.PRETTY || (!config.PRETTY && process.env.STAGE === 'local'));

  formats.push(createLabelFormatter(config));
  formats.push(legacySplatFormatter);

  // Allow custom formats to be provided via config
  if (config.FORMAT) {
    const list = Array.isArray(config.FORMAT) ? config.FORMAT : [config.FORMAT];
    list.forEach(f => {
      formats.push(winston.format[f]());
    });
  } else {
    // Always add timestamp + align the level (prepends a tab to the message)
    formats.push(winston.format.timestamp({ format: 'HH:mm:ss' }));
    formats.push(winston.format.align());

    if (usePrettyFormatting) {
      formats.push(winston.format.colorize({
        all: true
      }));
      formats.push(winston.format[PRETTY_SIMPLE]());
    } else {
      formats.push(winston.format.simple());
    }
  }

  // Redactor goes last, because [MESSAGE] needs to be a string by now
  const scrubConfig = config.SCRUB || DEFAULT_SCRUB_CONFIG;
  const scrubText = usePrettyFormatting && colors.red ? colors.underline(colors.red('[REDACTED]')) : 'REDACTED';
  const redactor: TransformFunction = createRedactor(scrubConfig, scrubText);
  formats.push(format(redactor)());

  return formats;
}

function getTransports(config: LoggerOptions) {
  // Determine CloudWatch log level (prefer environment variable; fallback to config; default = "warn")
  let level = 'warn';
  if (process.env.CLIENT_CW_LOG_LEVEL) {
    level = process.env.CLIENT_CW_LOG_LEVEL;
  } else if (config.CLOUDWATCH && config.CLOUDWATCH.LEVEL) {
    level = config.CLOUDWATCH.LEVEL;
  }
  // tslint:disable-next-line:no-console
  console.log('CloudWatch log level is', level);

  // Create transports list
  return [
    new winston.transports.Console({ level })
  ];
}

// Wrap Winston's createLogger
export const createLogger = (config: LoggerOptions): Logger => {
  // Create the logger
  return winston.createLogger({
    format: winston.format.combine(...getFormats(config)),
    transports: getTransports(config)
  });
};
