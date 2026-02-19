import {
  specificationObj as OpenApi3_1Specification,
  ReferenceVisitorOptions,
  ReferenceVisitor as ReferenceVisitorType,
} from '@swagger-api/apidom-ns-openapi-3-1';

import ReferenceElement from '../../../../elements/Reference.ts';

/**
 * @public
 */
export const BaseReferenceVisitor: typeof ReferenceVisitorType =
  OpenApi3_1Specification.visitors.document.objects.Reference.$visitor;

export type { ReferenceVisitorOptions };

/**
 * @public
 */
class ReferenceVisitor extends BaseReferenceVisitor {
  declare public readonly element: ReferenceElement;

  constructor(options: ReferenceVisitorOptions) {
    super(options);
    this.element = new ReferenceElement();
  }
}

export default ReferenceVisitor;
