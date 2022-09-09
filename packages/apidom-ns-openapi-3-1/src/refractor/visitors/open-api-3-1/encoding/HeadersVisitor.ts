import stampit from 'stampit';
import { Element, ObjectElement, StringElement } from '@swagger-api/apidom-core';
import { isReferenceLikeElement, EncodingHeadersElement } from '@swagger-api/apidom-ns-openapi-3-0';

import MapVisitor from '../../generics/MapVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import { isHeaderElement, isReferenceElement } from '../../../../predicates';
import ReferenceElement from '../../../../elements/Reference';

const HeadersVisitor = stampit(MapVisitor, FallbackVisitor, {
  props: {
    specPath: (element: Element) =>
      isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : ['document', 'objects', 'Header'],
  },
  init() {
    this.element = new EncodingHeadersElement();
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

        value.setMetaProperty('headerName', headerName);
      });

      return result;
    },
  },
});

export default HeadersVisitor;
