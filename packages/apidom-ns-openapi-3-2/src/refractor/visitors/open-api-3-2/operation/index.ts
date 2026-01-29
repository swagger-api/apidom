import {
  specificationObj as OpenApi3_1Specification,
  OperationVisitorOptions,
  OperationVisitor as OperationVisitorType,
} from '@swagger-api/apidom-ns-openapi-3-1';

import OperationElement from '../../../../elements/Operation.ts';

/**
 * @public
 */
export const BaseOperationVisitor: typeof OperationVisitorType =
  OpenApi3_1Specification.visitors.document.objects.Operation.$visitor;

export type { OperationVisitorOptions };

/**
 * @public
 */
class OperationVisitor extends BaseOperationVisitor {
  declare public readonly element: OperationElement;

  constructor(options: OperationVisitorOptions) {
    super(options);
    this.element = new OperationElement();
  }
}

export default OperationVisitor;
