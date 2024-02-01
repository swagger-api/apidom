import {
  specificationObj as OpenApi3_1Specification,
  RequestBodyVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';

import RequestBodyElement from '../../../../elements/RequestBody';

const {
  visitors: {
    document: {
      objects: {
        RequestBody: { $visitor: BaseRequestBodyVisitor },
      },
    },
  },
} = OpenApi3_1Specification;

export type { RequestBodyVisitorOptions };
class RequestBodyVisitor extends BaseRequestBodyVisitor {
  public declare readonly element: RequestBodyElement;

  constructor(options: RequestBodyVisitorOptions) {
    super(options);
    this.element = new RequestBodyElement();
  }
}

export default RequestBodyVisitor;
