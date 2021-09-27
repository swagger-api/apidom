import stampit from 'stampit';
import { ObjectElement, StringElement, Element } from '@swagger-api/apidom-core';

import ReferenceElement from '../../../elements/Reference';
import PathItemElement from '../../../elements/PathItem';
import MapVisitor from '../generics/MapVisitor';
import FallbackVisitor from '../FallbackVisitor';
import { isReferenceLikeElement } from '../../predicates';
import { isPathItemElement, isReferenceElement } from '../../../predicates';

const WebhooksVisitor = stampit(MapVisitor, FallbackVisitor, {
  props: {
    specPath: (element: Element) => {
      // eslint-disable-next-line no-nested-ternary
      return isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : ['document', 'objects', 'PathItem'];
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

      // decorate every ReferenceElement with metadata about their referencing type
      this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
        referenceElement.setMetaProperty('referenced-element', 'pathItem');
      });

      // decorate every PathItemElement with Webhook name metadata
      this.element
        .filter(isPathItemElement)
        .forEach((pathItemElement: PathItemElement, key: StringElement) => {
          pathItemElement.setMetaProperty('webhook-name', key.toValue());
        });

      return result;
    },
  },
});

export default WebhooksVisitor;
