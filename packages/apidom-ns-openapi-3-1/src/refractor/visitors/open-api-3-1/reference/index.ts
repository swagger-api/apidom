import stampit from 'stampit';
import { specificationObj as OpenApi3_1Specification } from '@swagger-api/apidom-ns-openapi-3-0';

import ReferenceElement from '../../../../elements/Reference';

const {
  visitors: {
    document: {
      objects: {
        Reference: { $visitor: BaseReferenceVisitor },
      },
    },
  },
} = OpenApi3_1Specification;

const ReferenceVisitor = stampit(BaseReferenceVisitor, {
  init() {
    this.element = new ReferenceElement();
  },
});

export default ReferenceVisitor;
