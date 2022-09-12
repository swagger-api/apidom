import stampit from 'stampit';
import { specificationObj as OpenApi3_1Specification } from '@swagger-api/apidom-ns-openapi-3-0';

import HeaderElement from '../../../../elements/Header';

const {
  visitors: {
    document: {
      objects: {
        Header: { $visitor: BaseHeaderVisitor },
      },
    },
  },
} = OpenApi3_1Specification;

const HeaderVisitor = stampit(BaseHeaderVisitor, {
  init() {
    this.element = new HeaderElement();
  },
});

export default HeaderVisitor;
