import { ApiDOMError } from '@swagger-api/apidom-error';

export default class InvalidRelativeJsonPointerError extends ApiDOMError {
  constructor(relativePointer: string) {
    super(`Invalid Relative JSON Pointer "${relativePointer}".`);
  }
}
