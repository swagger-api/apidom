import { ObjectElement } from '@swagger-api/apidom-core';
import {
  isReferenceLikeElement,
  specificationObj as OpenApi3_1Specification,
  PatternedFieldsVisitorOptions,
  SpecPath,
} from '@swagger-api/apidom-ns-openapi-3-0';

import CallbackElement from '../../../../elements/Callback';
import ReferenceElement from '../../../../elements/Reference';
import { isReferenceElement } from '../../../../predicates';

const {
  visitors: {
    document: {
      objects: {
        Callback: { $visitor: BaseCallbackVisitor },
      },
    },
  },
} = OpenApi3_1Specification;

class CallbackVisitor extends BaseCallbackVisitor {
  public declare readonly element: CallbackElement;

  public declare readonly specPath: SpecPath<
    ['document', 'objects', 'Reference'] | ['document', 'objects', 'PathItem']
  >;

  constructor(options: PatternedFieldsVisitorOptions) {
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
