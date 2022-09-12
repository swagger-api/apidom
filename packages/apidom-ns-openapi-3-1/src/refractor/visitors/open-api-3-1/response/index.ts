import stampit from 'stampit';
import { specificationObj as OpenApi3_1Specification } from '@swagger-api/apidom-ns-openapi-3-0';

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

const ResponseVisitor = stampit(BaseResponseVisitor, {
  init() {
    this.element = new ResponseElement();
  },
});

export default ResponseVisitor;
