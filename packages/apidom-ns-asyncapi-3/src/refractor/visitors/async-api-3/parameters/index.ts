import {
  specificationObj as AsyncApi2Specification,
  ParametersVisitorOptions,
  ParametersVisitor as ParametersVisitorType,
} from '@swagger-api/apidom-ns-asyncapi-2';

import ParametersElement from '../../../../elements/Parameters.ts';

export const BaseParametersVisitor: typeof ParametersVisitorType =
  AsyncApi2Specification.visitors.document.objects.Parameters.$visitor;

export type { ParametersVisitorOptions };

/**
 * @public
 */
class ParametersVisitor extends BaseParametersVisitor {
  declare public readonly element: ParametersElement;

  constructor(options: ParametersVisitorOptions) {
    super(options);
    this.element = new ParametersElement();
  }
}

export default ParametersVisitor;
