import stampit from 'stampit';
import { ObjectElement, Element, StringElement } from '@swagger-api/apidom-core';
import { isReferenceLikeElement, ResponseHeadersElement } from '@swagger-api/apidom-ns-openapi-3-0';

import ReferenceElement from '../../../../elements/Reference';
import MapVisitor from '../../generics/MapVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import { isHeaderElement, isReferenceElement } from '../../../../predicates';

const HeadersVisitor = stampit(MapVisitor, FallbackVisitor, {
  props: {
    specPath: (element: Element) => {
      // eslint-disable-next-line no-nested-ternary
      return isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : ['document', 'objects', 'Header'];
    },
  },
  init() {
    this.element = new ResponseHeadersElement();
  },
  methods: {
    ObjectElement(objectElement: ObjectElement) {
      // @ts-ignore
      const result = MapVisitor.compose.methods.ObjectElement.call(this, objectElement);

      // decorate every ReferenceElement with metadata about their referencing type
      this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
        referenceElement.setMetaProperty('referenced-element', 'header');
      });

      // decorate every HeaderElement with metadata about their name
      this.element.forEach((value: Element, key: StringElement): void => {
        if (!isHeaderElement(value)) return;

        const headerName = key.toValue();

        value.setMetaProperty('header-name', headerName);
      });

      return result;
    },
  },
});

export default HeadersVisitor;
