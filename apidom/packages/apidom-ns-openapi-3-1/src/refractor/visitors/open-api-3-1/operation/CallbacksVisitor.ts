import stampit from 'stampit';
import { Element, isObjectElement, ObjectElement } from 'apidom';

import { isReferenceLikeElement } from '../../../predicates';
import { isReferenceElement } from '../../../../predicates';
import ReferenceElement from '../../../../elements/Reference';
import MapVisitor from '../../generics/MapVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import { appendMetadata } from '../../../metadata';

const CallbacksVisitor = stampit(MapVisitor, FallbackVisitor, {
  props: {
    specPath: (element: Element) => {
      // eslint-disable-next-line no-nested-ternary
      return isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : isObjectElement(element)
        ? ['document', 'objects', 'Callback']
        : ['value'];
    },
  },
  init() {
    this.element = new ObjectElement();
    appendMetadata(['callbacks'], this.element);
  },
  methods: {
    Object(objectElement: ObjectElement) {
      // @ts-ignore
      const result = MapVisitor.compose.methods.Object.call(this, objectElement);

      this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
        referenceElement.setMetaProperty('referenced-element', 'callback');
      });

      return result;
    },
  },
});

export default CallbacksVisitor;
