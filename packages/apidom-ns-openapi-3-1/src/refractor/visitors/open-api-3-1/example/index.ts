import {
  specificationObj as OpenApi3_1Specification,
  ExampleVisitorOptions,
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

export type { ExampleVisitorOptions };

class ExampleVisitor extends BaseExampleVisitor {
  public declare readonly element: ExampleElement;

  constructor(options: ExampleVisitorOptions) {
    super(options);
    this.element = new ExampleElement();
  }
}

export default ExampleVisitor;
