import stampit from 'stampit';
import { specificationObj as OpenApi3_1Specification } from '@swagger-api/apidom-ns-openapi-3-0';

import PathsElement from '../../../../elements/Paths';

const {
  visitors: {
    document: {
      objects: {
        Paths: { $visitor: BasePathsVisitor },
      },
    },
  },
} = OpenApi3_1Specification;

const PathsVisitor = stampit(BasePathsVisitor, {
  init() {
    this.element = new PathsElement();
  },
});

export default PathsVisitor;
