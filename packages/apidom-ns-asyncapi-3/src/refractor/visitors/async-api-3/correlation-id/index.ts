import {
  specificationObj as AsyncApi2Specification,
  CorrelationIDVisitorOptions,
  CorrelationIDVisitor as CorrelationIDVisitorType,
} from '@swagger-api/apidom-ns-asyncapi-2';

import CorrelationIDElement from '../../../../elements/CorrelationID.ts';

export const BaseCorrelationIDVisitor: typeof CorrelationIDVisitorType =
  AsyncApi2Specification.visitors.document.objects.CorrelationID.$visitor;

export type { CorrelationIDVisitorOptions };

/**
 * @public
 */
class CorrelationIDVisitor extends BaseCorrelationIDVisitor {
  declare public readonly element: CorrelationIDElement;

  constructor(options: CorrelationIDVisitorOptions) {
    super(options);
    this.element = new CorrelationIDElement();
  }
}

export default CorrelationIDVisitor;