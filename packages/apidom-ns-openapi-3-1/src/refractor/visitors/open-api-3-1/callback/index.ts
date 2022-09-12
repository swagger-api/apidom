import stampit from 'stampit';
import { Element, ObjectElement } from '@swagger-api/apidom-core';
import {
  isReferenceLikeElement,
  specificationObj as OpenApi3_1Specification,
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

const CallbackVisitor = stampit(BaseCallbackVisitor, {
  props: {
    specPath: (element: Element) => {
      return isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : ['document', 'objects', 'PathItem'];
    },
  },
  init() {
    this.element = new CallbackElement();
  },
  methods: {
    ObjectElement(objectElement: ObjectElement) {
      // @ts-ignore
      const result = BaseCallbackVisitor.compose.methods.ObjectElement.call(this, objectElement);

      // decorate every ReferenceElement with metadata about their referencing type
      this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
        referenceElement.setMetaProperty('referenced-element', 'pathItem');
      });

      return result;
    },
  },
});

export default CallbackVisitor;
