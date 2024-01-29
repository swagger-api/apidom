import {
  specificationObj as OpenApi3_1Specification,
  FixedFieldsVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';

import ResponseElement from '../../../../elements/Response';

const {
  visitors: {
    document: {
      objects: {
        Response: { $visitor: BaseResponseVisitor },
      },
    },
  },
} = OpenApi3_1Specification;

class ResponseVisitor extends BaseResponseVisitor {
  public declare readonly element: ResponseElement;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new ResponseElement();
  }
}

export default ResponseVisitor;
