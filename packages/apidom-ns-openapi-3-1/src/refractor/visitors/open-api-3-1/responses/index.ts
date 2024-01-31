import {
  specificationObj as OpenApi3_1Specification,
  MixedFieldsVisitorOptions,
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

class ResponsesVisitor extends BaseResponsesVisitor {
  public declare readonly element: ResponsesElement;

  constructor(options: MixedFieldsVisitorOptions) {
    super(options);
    this.element = new ResponsesElement();
  }
}

export default ResponsesVisitor;
