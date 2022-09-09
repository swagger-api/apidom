import stampit from 'stampit';
import { ObjectElement, Element, StringElement } from '@swagger-api/apidom-core';
import {
  isReferenceLikeElement,
  ComponentsResponsesElement,
} from '@swagger-api/apidom-ns-openapi-3-0';

import ReferenceElement from '../../../../elements/Reference';
import MapVisitor from '../../generics/MapVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import { isReferenceElement, isResponseElement } from '../../../../predicates';

const ResponsesVisitor = stampit(MapVisitor, FallbackVisitor, {
  props: {
    specPath: (element: Element) => {
      // eslint-disable-next-line no-nested-ternary
      return isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : ['document', 'objects', 'Response'];
    },
  },
  init() {
    this.element = new ComponentsResponsesElement();
  },
  methods: {
    ObjectElement(objectElement: ObjectElement) {
      // @ts-ignore
      const result = MapVisitor.compose.methods.ObjectElement.call(this, objectElement);

      // decorate every ReferenceElement with metadata about their referencing type
      this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
        referenceElement.setMetaProperty('referenced-element', 'response');
      });

      // decorate every ResponseElement with metadata about their status code
      this.element.filter(isResponseElement).forEach((value: Element, key: StringElement) => {
        value.setMetaProperty('http-status-code', key.toValue());
      });

      return result;
    },
  },
});

export default ResponsesVisitor;
