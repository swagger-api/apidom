import stampit from 'stampit';
import { specificationObj as OpenApi3_1Specification } from '@swagger-api/apidom-ns-openapi-3-0';

import OperationElement from '../../../../elements/Operation';

const {
  visitors: {
    document: {
      objects: {
        Operation: { $visitor: BaseOperationVisitor },
      },
    },
  },
} = OpenApi3_1Specification;

const OperationVisitor = stampit(BaseOperationVisitor, {
  init() {
    this.element = new OperationElement();
  },
});

export default OperationVisitor;
