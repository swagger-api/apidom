import {
  specificationObj as OpenApi3_1Specification,
  DiscriminatorVisitorOptions,
  DiscriminatorVisitor as DiscriminatorVisitorType,
} from '@swagger-api/apidom-ns-openapi-3-0';

import DiscriminatorElement from '../../../../elements/Discriminator.ts';

/**
 * @public
 */
export const BaseDiscriminatorVisitor: typeof DiscriminatorVisitorType =
  OpenApi3_1Specification.visitors.document.objects.Discriminator.$visitor;

export type { DiscriminatorVisitorOptions };

/**
 * @public
 */
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
