import { isPlainObject } from 'ramda-adjunct';
import { hasIn } from 'ramda';

import ApiDOMErrorOptions from './ApiDOMErrorOptions';

class ApiDOMAggregateError extends AggregateError {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(errors: Iterable<any>, message?: string, options?: ApiDOMErrorOptions) {
    super(errors, message, options);

    this.name = this.constructor.name;
    if (typeof message === 'string') {
      this.message = message;
    }
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(message).stack;
    }

    /**
     * This needs to stay here until our minimum supported version of Node.js is >= 16.9.0.
     * Node.js is >= 16.9.0 supports error causes natively.
     */
    if (isPlainObject(options) && hasIn('cause', options) && !hasIn('cause', this)) {
      const { cause } = options;
      this.cause = cause;
      if (cause instanceof Error && hasIn('stack', cause)) {
        this.stack = `${this.stack}\nCAUSE: ${cause?.stack}`;
      }
    }
  }
}

export default ApiDOMAggregateError;
