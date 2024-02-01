import {
  specificationObj as OpenApi3_1Specification,
  DiscriminatorVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';

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

export type { DiscriminatorVisitorOptions };

class DiscriminatorVisitor extends BaseDiscriminatorVisitor {
  public declare readonly element: DiscriminatorElement;

  protected declare readonly canSupportSpecificationExtensions: true;

  constructor(options: DiscriminatorVisitorOptions) {
    super(options);
    this.element = new DiscriminatorElement();
    this.canSupportSpecificationExtensions = true;
  }
}

export default DiscriminatorVisitor;
