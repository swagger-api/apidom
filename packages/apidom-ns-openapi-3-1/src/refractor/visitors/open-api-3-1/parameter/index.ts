import {
  specificationObj as OpenApi3_1Specification,
  ParameterVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';

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

export type { ParameterVisitorOptions };
class ParameterVisitor extends BaseParameterVisitor {
  public declare readonly element: ParameterElement;

  constructor(options: ParameterVisitorOptions) {
    super(options);
    this.element = new ParameterElement();
  }
}

export default ParameterVisitor;
