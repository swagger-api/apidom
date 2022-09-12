import stampit from 'stampit';
import { specificationObj as OpenApi3_1Specification } from '@swagger-api/apidom-ns-openapi-3-0';

import PathItemElement from '../../../../elements/PathItem';

const {
  visitors: {
    document: {
      objects: {
        PathItem: { $visitor: BasePathItemVisitor },
      },
    },
  },
} = OpenApi3_1Specification;

const PathItemVisitor = stampit(BasePathItemVisitor, {
  init() {
    this.element = new PathItemElement();
  },
});

export default PathItemVisitor;
