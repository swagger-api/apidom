import stampit from 'stampit';
import { ObjectElement, Element } from 'apidom';

import ReferenceElement from '../../../elements/Reference';
import MapVisitor from '../generics/MapVisitor';
import FallbackVisitor from '../FallbackVisitor';
import { isPathItemLikeElement, isReferenceLikeElement } from '../../predicates';
import { isReferenceElement } from '../../../predicates';

const WebhooksVisitor = stampit(MapVisitor, FallbackVisitor, {
  props: {
    specPath: (element: Element) => {
      // eslint-disable-next-line no-nested-ternary
      return isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : isPathItemLikeElement(element)
        ? ['document', 'objects', 'PathItem']
        : ['value'];
    },
  },
  init() {
    this.element = new ObjectElement();
    this.element.classes.push('webhooks');
  },
  methods: {
    ObjectElement(objectElement: ObjectElement) {
      // @ts-ignore
      const result = MapVisitor.compose.methods.ObjectElement.call(this, objectElement);

      this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
        referenceElement.setMetaProperty('referenced-element', 'pathItem');
      });

      return result;
    },
  },
});

export default WebhooksVisitor;
