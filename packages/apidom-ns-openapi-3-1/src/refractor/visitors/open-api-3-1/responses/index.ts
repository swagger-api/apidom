import {
  specificationObj as OpenApi3_1Specification,
  ResponsesVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';

import ResponsesElement from '../../../../elements/Responses';

const {
  visitors: {
    document: {
      objects: {
        Responses: { $visitor: BaseResponsesVisitor },
      },
    },
  },
} = OpenApi3_1Specification;

export type { ResponsesVisitorOptions };

class ResponsesVisitor extends BaseResponsesVisitor {
  public declare readonly element: ResponsesElement;

  constructor(options: ResponsesVisitorOptions) {
    super(options);
    this.element = new ResponsesElement();
  }
}

export default ResponsesVisitor;
