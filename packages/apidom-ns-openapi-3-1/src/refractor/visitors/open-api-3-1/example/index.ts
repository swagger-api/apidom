import stampit from 'stampit';
import { specificationObj as OpenApi3_1Specification } from '@swagger-api/apidom-ns-openapi-3-0';

import ExampleElement from '../../../../elements/Example';

const {
  visitors: {
    document: {
      objects: {
        Example: { $visitor: BaseExampleVisitor },
      },
    },
  },
} = OpenApi3_1Specification;

const ExampleVisitor = stampit(BaseExampleVisitor, {
  init() {
    this.element = new ExampleElement();
  },
});

export default ExampleVisitor;
