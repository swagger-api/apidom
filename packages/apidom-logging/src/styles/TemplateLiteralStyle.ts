import { ApiDOMStructuredError } from '@swagger-api/apidom-error';

import type { LogRecordInstance } from '../LogRecord';
import type Style from './Style';

export type Format = (value: Record<string, unknown>) => string;
type Defaults = Record<string, unknown>;

class TemplateLiteralStyle implements Style {
  protected fmt: Format;

  protected defaults?: Defaults;

  constructor(fmt: Format, defaults?: Defaults) {
    this.fmt = fmt;
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
