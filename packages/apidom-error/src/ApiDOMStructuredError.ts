import { omit } from 'ramda';

import ApiDOMError from './ApiDOMError';
import ApiDOMErrorOptions from './ApiDOMErrorOptions';

class ApiDOMStructuredError extends ApiDOMError {
  constructor(message?: string, structuredOptions?: ApiDOMErrorOptions) {
    super(message, structuredOptions);

    if (typeof structuredOptions !== 'undefined') {
      Object.assign(this, omit(['cause'], structuredOptions));
    }
  }
}

export default ApiDOMStructuredError;
