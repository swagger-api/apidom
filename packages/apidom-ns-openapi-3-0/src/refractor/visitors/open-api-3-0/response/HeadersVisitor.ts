import stampit from 'stampit';
import { ObjectElement, Element, StringElement, toValue } from '@swagger-api/apidom-core';

import ReferenceElement from '../../../../elements/Reference';
import ResponseHeadersElement from '../../../../elements/nces/ResponseHeaders';
import MapVisitor from '../../generics/MapVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import { isReferenceLikeElement } from '../../../predicates';
import { isHeaderElement, isReferenceElement } from '../../../../predicates';

const HeadersVisitor = stampit(MapVisitor, FallbackVisitor, {
  props: {
    specPath: (element: Element) => {
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

        const headerName = toValue(key);

        value.setMetaProperty('header-name', headerName);
      });

      return result;
    },
  },
});

export default HeadersVisitor;
