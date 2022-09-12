import stampit from 'stampit';
import { specificationObj as OpenApi3_1Specification } from '@swagger-api/apidom-ns-openapi-3-0';

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

const RequestBodyVisitor = stampit(BaseRequestBodyVisitor, {
  init() {
    this.element = new RequestBodyElement();
  },
});

export default RequestBodyVisitor;
