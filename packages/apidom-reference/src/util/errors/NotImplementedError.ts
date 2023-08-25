import { ApiDOMError, ApiDOMErrorOptions } from '@swagger-api/apidom-error';

class NotImplementedError extends ApiDOMError {
  constructor(message = 'Not Implemented', options?: ApiDOMErrorOptions) {
    super(message, options);
  }
}

export default NotImplementedError;
