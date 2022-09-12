import stampit from 'stampit';
import { specificationObj as OpenApi3_1Specification } from '@swagger-api/apidom-ns-openapi-3-0';

import ComponentsElement from '../../../../elements/Components';

const {
  visitors: {
    document: {
      objects: {
        Components: { $visitor: BaseComponentsVisitor },
      },
    },
  },
} = OpenApi3_1Specification;

const ComponentsVisitor = stampit(BaseComponentsVisitor, {
  init() {
    this.element = new ComponentsElement();
  },
});

export default ComponentsVisitor;
