import { RequestBodyElement, OperationElement } from '@swagger-api/apidom-ns-openapi-3-0';

import ReferenceElement from './Reference';

class Operation extends OperationElement {
  get requestBody(): RequestBodyElement | ReferenceElement | undefined {
    return this.get('requestBody');
  }

  set requestBody(requestBody: RequestBodyElement | ReferenceElement | undefined) {
    this.set('requestBody', requestBody);
  }
}

export default Operation;
