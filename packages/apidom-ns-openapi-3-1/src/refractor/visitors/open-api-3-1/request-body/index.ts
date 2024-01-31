import {
  specificationObj as OpenApi3_1Specification,
  FixedFieldsVisitorOptions,
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

class RequestBodyVisitor extends BaseRequestBodyVisitor {
  public declare readonly element: RequestBodyElement;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new RequestBodyElement();
  }
}

export default RequestBodyVisitor;
