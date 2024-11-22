import { ObjectElement } from '@swagger-api/apidom-core';
import {
  isReferenceLikeElement,
  specificationObj as OpenApi3_1Specification,
  SpecPath,
  CallbackVisitorOptions,
  CallbackVisitor as CallbackVisitorType,
} from '@swagger-api/apidom-ns-openapi-3-0';

import CallbackElement from '../../../../elements/Callback.ts';
import ReferenceElement from '../../../../elements/Reference.ts';
import { isReferenceElement } from '../../../../predicates.ts';

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
  public declare readonly element: CallbackElement;

  protected declare readonly specPath: SpecPath<
    ['document', 'objects', 'Reference'] | ['document', 'objects', 'PathItem']
  >;

  constructor(options: CallbackVisitorOptions) {
    super(options);
    this.element = new CallbackElement();
    this.specPath = (element: unknown) => {
      // @ts-ignore
      return isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : ['document', 'objects', 'PathItem'];
    };
  }

  ObjectElement(objectElement: ObjectElement) {
    const result = BaseCallbackVisitor.prototype.ObjectElement.call(this, objectElement);

    // decorate every ReferenceElement with metadata about their referencing type
    // @ts-ignore
    this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
      // @ts-ignore
      referenceElement.setMetaProperty('referenced-element', 'pathItem');
    });

    return result;
  }
}

export default CallbackVisitor;
