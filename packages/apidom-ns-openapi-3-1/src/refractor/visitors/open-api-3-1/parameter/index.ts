import stampit from 'stampit';
import { specificationObj as OpenApi3_1Specification } from '@swagger-api/apidom-ns-openapi-3-0';

import ParameterElement from '../../../../elements/Parameter';

const {
  visitors: {
    document: {
      objects: {
        Parameter: { $visitor: BaseParameterVisitor },
      },
    },
  },
} = OpenApi3_1Specification;

const ParameterVisitor = stampit(BaseParameterVisitor, {
  init() {
    this.element = new ParameterElement();
  },
});

export default ParameterVisitor;
