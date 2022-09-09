import stampit from 'stampit';
import { ObjectElement, StringElement, Element } from '@swagger-api/apidom-core';
import { isReferenceLikeElement } from '@swagger-api/apidom-ns-openapi-3-0';

import ReferenceElement from '../../../elements/Reference';
import PathItemElement from '../../../elements/PathItem';
import WebhooksElement from '../../../elements/nces/Webhooks';
import MapVisitor from '../generics/MapVisitor';
import FallbackVisitor from '../FallbackVisitor';
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
    this.element = new WebhooksElement();
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
