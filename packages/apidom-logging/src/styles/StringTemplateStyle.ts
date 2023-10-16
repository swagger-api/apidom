import { ApiDOMStructuredError } from '@swagger-api/apidom-error';

import type { LogRecordInstance } from '../LogRecord';
import type Style from './Style';

type Format = string;
type Defaults = Record<string, unknown>;

class StringTemplateStyle implements Style {
  public static readonly defaultFormat = '${message}'; // eslint-disable-line no-template-curly-in-string

  public static readonly asctimeFormat = '${asctime}'; // eslint-disable-line no-template-curly-in-string

  public static readonly asctimeSearch = '${asctime}'; // eslint-disable-line no-template-curly-in-string

  public static readonly validationPattern = /\${(.*?)}/g;

  public readonly fmt: Format;

  protected readonly defaults?: Defaults;

  constructor(fmt?: Format, defaults?: Defaults) {
    const self = this.constructor as unknown as typeof StringTemplateStyle;
    this.fmt = fmt ?? self.defaultFormat;
    this.defaults = defaults;
  }

  usesTime() {
    const self = this.constructor as unknown as typeof StringTemplateStyle;
    return this.fmt.includes(self.asctimeSearch);
  }

  validate() {
    const self = this.constructor as unknown as typeof StringTemplateStyle;

    if (this.fmt.match(self.validationPattern) === null) {
      throw new ApiDOMStructuredError('invalid format: no fields', {
        format: this.fmt,
      });
    }

    return true;
  }

  format(record: LogRecordInstance) {
    const self = this.constructor as unknown as typeof StringTemplateStyle;
    const values = { ...this.defaults, ...record };
    return this.fmt.replace(self.validationPattern, (substring, args) => String(values[args]));
  }
}

export default StringTemplateStyle;
