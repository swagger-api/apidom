import stampit from 'stampit';
import { specificationObj as OpenApi3_1Specification } from '@swagger-api/apidom-ns-openapi-3-0';

import EncodingElement from '../../../../elements/Encoding';

const {
  visitors: {
    document: {
      objects: {
        Encoding: { $visitor: BaseEncodingVisitor },
      },
    },
  },
} = OpenApi3_1Specification;

const EncodingVisitor = stampit(BaseEncodingVisitor, {
  init() {
    this.element = new EncodingElement();
  },
});

export default EncodingVisitor;
