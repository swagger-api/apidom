import {
  specificationObj as OpenApi3_1Specification,
  ReferenceVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';

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

export type { ReferenceVisitorOptions };
class ReferenceVisitor extends BaseReferenceVisitor {
  public declare readonly element: ReferenceElement;

  constructor(options: ReferenceVisitorOptions) {
    super(options);
    this.element = new ReferenceElement();
  }
}

export default ReferenceVisitor;
