import stampit from 'stampit';
import { Element, ObjectElement } from 'apidom';

import MapVisitor from '../../generics/MapVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import { isHeaderLikeElement, isReferenceLikeElement } from '../../../predicates';

const HeadersVisitor = stampit(MapVisitor, FallbackVisitor, {
  props: {
    specPath: (element: Element) => {
      // eslint-disable-next-line no-nested-ternary
      return isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : isHeaderLikeElement(element)
        ? ['document', 'objects', 'Header']
        : ['value'];
    },
  },
  init() {
    this.element = new ObjectElement();
    this.element.classes.push('encoding-headers');
  },
});

export default HeadersVisitor;
