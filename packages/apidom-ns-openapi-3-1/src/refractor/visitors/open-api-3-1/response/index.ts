import {
  specificationObj as OpenApi3_1Specification,
  ResponseVisitorOptions,
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

export type { ResponseVisitorOptions };

class ResponseVisitor extends BaseResponseVisitor {
  public declare readonly element: ResponseElement;

  constructor(options: ResponseVisitorOptions) {
    super(options);
    this.element = new ResponseElement();
  }
}

export default ResponseVisitor;
