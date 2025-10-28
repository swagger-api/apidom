import {
  specificationObj as AsyncApi2Specification,
  OperationBindingsVisitorOptions,
  OperationBindingsVisitor as OperationBindingsVisitorType,
} from '@swagger-api/apidom-ns-asyncapi-2';

import OperationBindingsElement from '../../../../elements/OperationBindings.ts';

export const BaseOperationBindingsVisitor: typeof OperationBindingsVisitorType =
  AsyncApi2Specification.visitors.document.objects.OperationBindings.$visitor;

export type { OperationBindingsVisitorOptions };

class OperationBindingsVisitor extends BaseOperationBindingsVisitor {
  declare public readonly element: OperationBindingsElement;

  constructor(options: OperationBindingsVisitorOptions) {
    super(options);
    this.element = new OperationBindingsElement();
  }
}

export default OperationBindingsVisitor;