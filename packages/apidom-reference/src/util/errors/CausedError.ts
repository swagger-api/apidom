import { hasIn } from 'ramda';
import { isPlainObject } from 'ramda-adjunct';

class CausedError extends Error {
  constructor(message: string, options?: { cause?: Error }) {
    super(message);

    if (isPlainObject(options) && hasIn('cause', options) && !hasIn('cause', this)) {
      const { cause } = options;
      this.cause = cause;
      if (hasIn('stack', cause)) {
        this.stack = `${this.stack}\nCAUSE: ${cause?.stack}`;
      }
    }
  }
}

export default CausedError;
