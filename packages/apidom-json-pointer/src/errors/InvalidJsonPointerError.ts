import { ApiDOMError } from '@swagger-api/apidom-error';

export default class InvalidJsonPointerError extends ApiDOMError {
  constructor(pointer: string) {
    super(`Invalid JSON Pointer "${pointer}". Pointers must begin with "/"`);
  }
}
