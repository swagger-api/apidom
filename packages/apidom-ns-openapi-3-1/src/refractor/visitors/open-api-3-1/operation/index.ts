import {
  specificationObj as OpenApi3_1Specification,
  OperationVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';

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

export type { OperationVisitorOptions };

class OperationVisitor extends BaseOperationVisitor {
  public declare readonly element: OperationElement;

  constructor(options: OperationVisitorOptions) {
    super(options);
    this.element = new OperationElement();
  }
}

export default OperationVisitor;
