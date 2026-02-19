import {
  specificationObj as OpenApi3_1Specification,
  ComponentsVisitorOptions,
  ComponentsVisitor as ComponentsVisitorType,
} from '@swagger-api/apidom-ns-openapi-3-1';

import ComponentsElement from '../../../../elements/Components.ts';

/**
 * @public
 */
export const BaseComponentsVisitor: typeof ComponentsVisitorType =
  OpenApi3_1Specification.visitors.document.objects.Components.$visitor;

export type { ComponentsVisitorOptions };

/**
 * @public
 */
class ComponentsVisitor extends BaseComponentsVisitor {
  declare public readonly element: ComponentsElement;

  constructor(options: ComponentsVisitorOptions) {
    super(options);
    this.element = new ComponentsElement();
  }
}

export default ComponentsVisitor;
