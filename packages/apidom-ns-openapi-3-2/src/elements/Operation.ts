import { OperationElement } from '@swagger-api/apidom-ns-openapi-3-1';

import RequestBodyElement from './RequestBody.ts';
import ReferenceElement from './Reference.ts';

/**
 * @public
 */
class Operation extends OperationElement {
  get requestBody(): RequestBodyElement | ReferenceElement | undefined {
    return this.get('requestBody');
  }

  set requestBody(requestBody: RequestBodyElement | ReferenceElement | undefined) {
    this.set('requestBody', requestBody);
  }
}

export default Operation;
