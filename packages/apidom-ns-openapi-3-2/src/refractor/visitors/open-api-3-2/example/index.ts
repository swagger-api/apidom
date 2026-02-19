import {
  specificationObj as OpenApi3_1Specification,
  ExampleVisitorOptions,
  ExampleVisitor as ExampleVisitorType,
} from '@swagger-api/apidom-ns-openapi-3-1';

import ExampleElement from '../../../../elements/Example.ts';

/**
 * @public
 */
export const BaseExampleVisitor: typeof ExampleVisitorType =
  OpenApi3_1Specification.visitors.document.objects.Example.$visitor;

export type { ExampleVisitorOptions };

/**
 * @public
 */
class ExampleVisitor extends BaseExampleVisitor {
  declare public readonly element: ExampleElement;

  constructor(options: ExampleVisitorOptions) {
    super(options);
    this.element = new ExampleElement();
  }
}

export default ExampleVisitor;
