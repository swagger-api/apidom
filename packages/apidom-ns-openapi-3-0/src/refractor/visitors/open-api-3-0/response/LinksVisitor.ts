import stampit from 'stampit';
import { ObjectElement, Element } from '@swagger-api/apidom-core';

import ReferenceElement from '../../../../elements/Reference';
import ResponseLinksElement from '../../../../elements/nces/ResponseLinks';
import MapVisitor from '../../generics/MapVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import { isReferenceLikeElement } from '../../../predicates';
import { isReferenceElement } from '../../../../predicates';

const HeadersVisitor = stampit(MapVisitor, FallbackVisitor, {
  props: {
    specPath: (element: Element) => {
      return isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : ['document', 'objects', 'Link'];
    },
  },
  init() {
    this.element = new ResponseLinksElement();
  },
  methods: {
    ObjectElement(objectElement: ObjectElement) {
      // @ts-ignore
      const result = MapVisitor.compose.methods.ObjectElement.call(this, objectElement);

      this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
        referenceElement.setMetaProperty('referenced-element', 'link');
      });

      return result;
    },
  },
});

export default HeadersVisitor;
