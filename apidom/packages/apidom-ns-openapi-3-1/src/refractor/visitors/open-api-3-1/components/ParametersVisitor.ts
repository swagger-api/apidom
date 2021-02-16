import stampit from 'stampit';
import { ObjectElement, Element } from 'apidom';

import ReferenceElement from '../../../../elements/Reference';
import MapVisitor from '../../generics/MapVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import { appendMetadata } from '../../../metadata';
import { isParameterLikeElement, isReferenceLikeElement } from '../../../predicates';
import { isReferenceElement } from '../../../../predicates';

const ParametersVisitor = stampit(MapVisitor, FallbackVisitor, {
  props: {
    specPath: (element: Element) => {
      // eslint-disable-next-line no-nested-ternary
      return isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : isParameterLikeElement(element)
        ? ['document', 'objects', 'Parameter']
        : ['value'];
    },
  },
  init() {
    this.element = new ObjectElement();
    appendMetadata(['parameters'], this.element);
  },
  methods: {
    object(objectElement: ObjectElement) {
      // @ts-ignore
      const result = MapVisitor.compose.methods.object.call(this, objectElement);

      this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
        referenceElement.setMetaProperty('referenced-element', 'parameter');
      });

      return result;
    },
  },
});

export default ParametersVisitor;
