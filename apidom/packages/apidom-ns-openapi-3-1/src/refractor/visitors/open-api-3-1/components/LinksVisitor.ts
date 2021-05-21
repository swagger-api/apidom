import stampit from 'stampit';
import { ObjectElement, Element } from 'apidom';

import ReferenceElement from '../../../../elements/Reference';
import MapVisitor from '../../generics/MapVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import { isLinkLikeElement, isReferenceLikeElement } from '../../../predicates';
import { isReferenceElement } from '../../../../predicates';

const LinksVisitor = stampit(MapVisitor, FallbackVisitor, {
  props: {
    specPath: (element: Element) => {
      // eslint-disable-next-line no-nested-ternary
      return isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : isLinkLikeElement(element)
        ? ['document', 'objects', 'Link']
        : ['value'];
    },
  },
  init() {
    this.element = new ObjectElement();
    this.element.classes.push('components-links');
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

export default LinksVisitor;
