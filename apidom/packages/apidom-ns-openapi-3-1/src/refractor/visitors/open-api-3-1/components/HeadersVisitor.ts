import stampit from 'stampit';
import { ObjectElement, Element, StringElement } from 'apidom';

import ReferenceElement from '../../../../elements/Reference';
import MapVisitor from '../../generics/MapVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import { isReferenceLikeElement } from '../../../predicates';
import { isReferenceElement, isHeaderElement } from '../../../../predicates';

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
    this.element = new ObjectElement();
    this.element.classes.push('components-headers');
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
