import { ApiDOMStructuredError } from '@swagger-api/apidom-error';

import type { LogRecordInstance } from '../LogRecord';
import type Style from './Style';

export type Format = (value: Record<string, unknown>) => string;
type Defaults = Record<string, unknown>;

class TemplateLiteralStyle implements Style {
  public static readonly defaultFormat: Format = ({ message }) => `${message}`;

  public readonly fmt: Format;

  protected readonly defaults?: Defaults;

  constructor(fmt?: Format, defaults?: Defaults) {
    const self = this.constructor as unknown as typeof TemplateLiteralStyle;
    this.fmt = fmt ?? self.defaultFormat;
    this.defaults = defaults;
  }

  usesTime() {
    const asctime = '^^%%$$';
    const interpolated = this.fmt({ asctime });

    return interpolated.includes(asctime);
  }

  validate() {
    try {
      this.fmt({});
    } catch (error) {
      throw new ApiDOMStructuredError('Invalid template literal.', {
        cause: error,
      });
    }
    return true;
  }

  format(record: LogRecordInstance) {
    const values = { ...this.defaults, ...record };
    return this.fmt(values);
  }
}

export default TemplateLiteralStyle;
