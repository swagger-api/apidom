import {
  specificationObj as AsyncApi2Specification,
  OperationTraitVisitorOptions,
  OperationTraitVisitor as OperationTraitVisitorType,
} from '@swagger-api/apidom-ns-asyncapi-2';

import OperationTraitElement from '../../../../elements/OperationTrait.ts';

export const BaseOperationTraitVisitor: typeof OperationTraitVisitorType =
  AsyncApi2Specification.visitors.document.objects.OperationTrait.$visitor;

export type { OperationTraitVisitorOptions };

/**
 * @public
 */
class OperationTraitVisitor extends BaseOperationTraitVisitor {
  declare public readonly element: OperationTraitElement;

  constructor(options: OperationTraitVisitorOptions) {
    super(options);
    this.element = new OperationTraitElement();
  }
}

export default OperationTraitVisitor;
