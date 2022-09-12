import stampit from 'stampit';
import { specificationObj as OpenApi3_1Specification } from '@swagger-api/apidom-ns-openapi-3-0';

import DiscriminatorElement from '../../../../elements/Discriminator';

const {
  visitors: {
    document: {
      objects: {
        Discriminator: { $visitor: BaseDiscriminatorVisitor },
      },
    },
  },
} = OpenApi3_1Specification;

const DiscriminatorVisitor = stampit(BaseDiscriminatorVisitor, {
  init() {
    this.element = new DiscriminatorElement();
  },
});

export default DiscriminatorVisitor;
