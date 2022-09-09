import stampit from 'stampit';
import { Element, ObjectElement } from '@swagger-api/apidom-core';
import {
  isReferenceLikeElement,
  OperationCallbacksElement,
} from '@swagger-api/apidom-ns-openapi-3-0';

import { isReferenceElement } from '../../../../predicates';
import ReferenceElement from '../../../../elements/Reference';
import MapVisitor from '../../generics/MapVisitor';
import FallbackVisitor from '../../FallbackVisitor';

const CallbacksVisitor = stampit(MapVisitor, FallbackVisitor, {
  props: {
    specPath: (element: Element) =>
      isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : ['document', 'objects', 'Callback'],
  },
  init() {
    this.element = new OperationCallbacksElement();
  },
  methods: {
    ObjectElement(objectElement: ObjectElement) {
      // @ts-ignore
      const result = MapVisitor.compose.methods.ObjectElement.call(this, objectElement);

      this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
        referenceElement.setMetaProperty('referenced-element', 'callback');
      });

      return result;
    },
  },
});

export default CallbacksVisitor;
