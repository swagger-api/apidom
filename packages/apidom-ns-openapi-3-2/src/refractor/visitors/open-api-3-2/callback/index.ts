import { ObjectElement } from '@swagger-api/apidom-core';
import {
  specificationObj as OpenApi3_1Specification,
  SpecPath,
  CallbackVisitorOptions,
  CallbackVisitor as CallbackVisitorType,
} from '@swagger-api/apidom-ns-openapi-3-1';

import CallbackElement from '../../../../elements/Callback.ts';

/**
 * @public
 */
export const BaseCallbackVisitor: typeof CallbackVisitorType =
  OpenApi3_1Specification.visitors.document.objects.Callback.$visitor;

export type { CallbackVisitorOptions };

/**
 * @public
 */
class CallbackVisitor extends BaseCallbackVisitor {
  declare public readonly element: CallbackElement;

  declare protected readonly specPath: SpecPath<['document', 'objects', 'PathItem']>;

  constructor(options: CallbackVisitorOptions) {
    super(options);
    this.element = new CallbackElement();
    // OpenAPI 3.2: Callback values are Path Item Objects only (not Reference Objects).
    // Path Item itself can have $ref, which is handled by the dereference strategy.
    this.specPath = () => ['document', 'objects', 'PathItem'];
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = BaseCallbackVisitor.prototype.ObjectElement.call(this, objectElement);

    return result;
  }
}

export default CallbackVisitor;
