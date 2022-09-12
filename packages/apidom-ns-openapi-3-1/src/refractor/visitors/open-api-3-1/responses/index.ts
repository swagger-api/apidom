import stampit from 'stampit';
import { specificationObj as OpenApi3_1Specification } from '@swagger-api/apidom-ns-openapi-3-0';

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

const ResponsesVisitor = stampit(BaseResponsesVisitor, {
  init() {
    this.element = new ResponsesElement();
  },
});

export default ResponsesVisitor;
