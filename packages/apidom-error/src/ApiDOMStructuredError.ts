import ApiDOMError from './ApiDOMError';
import ApiDOMErrorOptions from './ApiDOMErrorOptions';

class ApiDOMStructuredError extends ApiDOMError {
  constructor(message?: string, structuredOptions?: ApiDOMErrorOptions) {
    super(message, structuredOptions);

    if (structuredOptions != null && typeof structuredOptions === 'object') {
      const { cause, ...causelessOptions } = structuredOptions;
      Object.assign(this, causelessOptions);
    }
  }
}

export default ApiDOMStructuredError;
