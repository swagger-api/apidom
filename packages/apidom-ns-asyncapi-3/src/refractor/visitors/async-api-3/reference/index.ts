import {
  specificationObj as AsyncApi2Specification,
  ReferenceVisitorOptions,
 ReferenceVisitor as ReferenceVisitorType,
} from '@swagger-api/apidom-ns-asyncapi-2';

import ReferenceElement from '../../../../elements/Reference.ts';

/**
 * @public
 */
export const BaseReferenceVisitor: typeof ReferenceVisitorType =
  AsyncApi2Specification.visitors.document.objects.Reference.$visitor;

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
