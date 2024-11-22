import {
  specificationObj as OpenApi3_1Specification,
  ParameterVisitorOptions,
  ParameterVisitor as ParameterVisitorType,
} from '@swagger-api/apidom-ns-openapi-3-0';

import ParameterElement from '../../../../elements/Parameter.ts';

/**
 * @public
 */
export const BaseParameterVisitor: typeof ParameterVisitorType =
  OpenApi3_1Specification.visitors.document.objects.Parameter.$visitor;

export type { ParameterVisitorOptions };

/**
 * @public
 */
class ParameterVisitor extends BaseParameterVisitor {
  public declare readonly element: ParameterElement;

  constructor(options: ParameterVisitorOptions) {
    super(options);
    this.element = new ParameterElement();
  }
}

export default ParameterVisitor;
