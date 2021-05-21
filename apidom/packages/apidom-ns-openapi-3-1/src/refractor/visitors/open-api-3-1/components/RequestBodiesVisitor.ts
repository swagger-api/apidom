import stampit from 'stampit';
import { ObjectElement, Element } from 'apidom';

import ReferenceElement from '../../../../elements/Reference';
import MapVisitor from '../../generics/MapVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import { isRequestBodyLikeElement, isReferenceLikeElement } from '../../../predicates';
import { isReferenceElement } from '../../../../predicates';

const RequestBodiesVisitor = stampit(MapVisitor, FallbackVisitor, {
  props: {
    specPath: (element: Element) => {
      // eslint-disable-next-line no-nested-ternary
      return isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : isRequestBodyLikeElement(element)
        ? ['document', 'objects', 'RequestBody']
        : ['value'];
    },
  },
  init() {
    this.element = new ObjectElement();
    this.element.classes.push('components-request-bodies');
  },
  methods: {
    ObjectElement(objectElement: ObjectElement) {
      // @ts-ignore
      const result = MapVisitor.compose.methods.ObjectElement.call(this, objectElement);

      this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
        referenceElement.setMetaProperty('referenced-element', 'requestBody');
      });

      return result;
    },
  },
});

export default RequestBodiesVisitor;
