import stampit from 'stampit';
import { Element, ObjectElement } from '@swagger-api/apidom-core';

import { isReferenceLikeElement } from '../../../predicates';
import { isReferenceElement } from '../../../../predicates';
import ReferenceElement from '../../../../elements/Reference';
import OperationCallbacksElement from '../../../../elements/nces/OperationCallbacks';
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
