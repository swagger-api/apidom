import { ApiDOMStructuredError } from '@swagger-api/apidom-error';

import STYLES, { Style } from './styles';

export interface FormatterOptions {
  readonly fmt?: Style['fmt'];
  readonly datefmt?: string;
  readonly style?: keyof typeof STYLES;
  readonly validate?: boolean;
  readonly defaults?: Record<string, unknown>;
}

class Formatter {
  protected readonly style: Style;

  protected readonly datefmt?: string;

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
}

export default Formatter;
