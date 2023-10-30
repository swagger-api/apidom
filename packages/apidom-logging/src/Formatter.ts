import { ApiDOMStructuredError } from '@swagger-api/apidom-error';

import STYLES, { Style } from './styles';
import type { LogRecordInstance } from './LogRecord';

export interface FormatterOptions {
  readonly fmt?: Style['fmt'];
  readonly datefmt?: string;
  readonly style?: keyof typeof STYLES;
  readonly validate?: boolean;
  readonly defaults?: Record<string, unknown>;
}

export interface FormatterInstance {
  format(record: LogRecordInstance): string;
}

export interface FormatterConstructor {
  new (options: FormatterOptions): FormatterInstance;
}

const momentToIntlFormat = (momentFormat: string): Intl.DateTimeFormatOptions => {
  if (momentToIntlFormat.cache.has(momentFormat)) {
    return momentToIntlFormat.cache.get(momentFormat)!;
  }

  const mapping = {
    YYYY: { year: 'numeric' },
    YY: { year: '2-digit' },
    MMMM: { month: 'long' },
    MMM: { month: 'short' },
    MM: { month: '2-digit' },
    DD: { day: '2-digit' },
    dddd: { weekday: 'long' },
    ddd: { weekday: 'short' },
    HH: { hour: '2-digit', hour12: false },
    hh: { hour: '2-digit', hour12: true },
    mm: { minute: '2-digit' },
    ss: { second: '2-digit' },
    A: { hour12: true },
    z: { timeZoneName: 'short' }, // abbreviated time zone name
    Z: { timeZoneName: 'short' }, // offset from GMT
  };
  type MomentToken = keyof typeof mapping;

  const intlOptions: Intl.DateTimeFormatOptions = Object.keys(mapping).reduce((opts, token) => {
    if (momentFormat.includes(token)) {
      return { ...opts, ...mapping[token as MomentToken] };
    }
    return opts;
  }, {});

  momentToIntlFormat.cache.set(momentFormat, intlOptions);

  return intlOptions;
};
momentToIntlFormat.cache = new Map<string, Intl.DateTimeFormatOptions>();

class Formatter implements FormatterInstance {
  protected readonly style: Style;

  protected readonly datefmt?: string;

  protected readonly defaultDateTimeFormat!: 'DD MM YYYY hh:mm:ss';

  protected readonly appendMsecInfo = true;

  constructor(options: FormatterOptions = {}) {
    const style = options.style ?? '$';

    if (style === '$' && typeof options.fmt === 'string') {
      this.style = new STYLES.$[0](options.fmt, options.defaults);
    } else if (style === '`' && typeof options.fmt === 'function') {
      this.style = new STYLES['`'][0](options.fmt, options.defaults);
    } else {
      throw new ApiDOMStructuredError(
        `Invalid style: "${style}". Valid styles are: ${Object.keys(STYLES).join(', ')}`,
        {
          style,
        },
      );
    }

    if (options.validate) {
      this.style.validate();
    }

    this.datefmt = options.datefmt;
  }

  protected usesTime(): boolean {
    return this.style.usesTime();
  }

  protected formatTime(record: LogRecordInstance, datefmt?: string): string {
    const intlOptions = momentToIntlFormat(datefmt ?? this.defaultDateTimeFormat);
    const formattedTime = new Intl.DateTimeFormat(undefined, intlOptions).format(record.created);

    if (this.appendMsecInfo) {
      return `${formattedTime},${String(record.msecs).padStart(3, '0')}`;
    }

    return formattedTime;
  }

  protected formatMessage(record: LogRecordInstance): string {
    return this.style.format(record);
  }

  // eslint-disable-next-line class-methods-use-this
  protected formatError<T extends Error>(error: T): string {
    return `Error: ${error.message}\nStack: ${error.stack ?? 'No stack available'}`;
  }

  public format(record: LogRecordInstance) {
    if (this.usesTime()) {
      record.asctime = this.formatTime(record, this.datefmt); // eslint-disable-line no-param-reassign
    }

    const formattedMessage = this.formatMessage(record);

    if (record.error && typeof record.error_text === 'undefined') {
      record.error_text = this.formatError(record.error); // eslint-disable-line no-param-reassign
    }

    if (record.error_text) {
      const separator = formattedMessage.endsWith('\n') ? '' : '\n';
      return `${formattedMessage}${separator}${record.error_text}`;
    }

    return formattedMessage;
  }
}

export default Formatter;
