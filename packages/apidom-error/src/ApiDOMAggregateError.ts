import { isPlainObject } from 'ramda-adjunct';
import { hasIn } from 'ramda';
// @ts-ignore
import AggregateErrorPolyfill from '@babel/runtime-corejs3/core-js/aggregate-error';

import ApiDOMErrorOptions from './ApiDOMErrorOptions';

/**
 * ApiDOMAggregateError is using polyfill of AggregateError from core-js-pure
 * in environments which don't support global AggregateError symbol.
 */

class ApiDOMAggregateError extends (globalThis.AggregateError ?? AggregateErrorPolyfill) {
  constructor(errors: Iterable<unknown>, message?: string, options?: ApiDOMErrorOptions) {
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
