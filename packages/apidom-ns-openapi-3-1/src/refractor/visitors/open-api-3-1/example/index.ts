import {
  specificationObj as OpenApi3_1Specification,
  FixedFieldsVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';

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

class ExampleVisitor extends BaseExampleVisitor {
  public declare readonly element: ExampleElement;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new ExampleElement();
  }
}

export default ExampleVisitor;
