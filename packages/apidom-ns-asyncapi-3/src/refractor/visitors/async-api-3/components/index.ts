import {
  specificationObj as AsyncApi2Specification,
  ComponentsVisitorOptions,
  ComponentsVisitor as ComponentsVisitorType,
} from '@swagger-api/apidom-ns-asyncapi-2';

import ComponentsElement from '../../../../elements/Components.ts';

export const BaseComponentsVisitor: typeof ComponentsVisitorType =
  AsyncApi2Specification.visitors.document.objects.Components.$visitor;

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
