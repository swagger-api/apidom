import { hasIn } from 'ramda';
import { isPlainObject } from 'ramda-adjunct';

/**
 * This needs to stay here until our minimum supported version of Node.js is >= 16.9.0.
 * Node.js is >= 16.9.0 supports error causes natively.
 */
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
