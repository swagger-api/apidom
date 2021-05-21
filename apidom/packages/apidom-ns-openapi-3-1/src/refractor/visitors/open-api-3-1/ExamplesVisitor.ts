import stampit from 'stampit';
import { Element, ObjectElement } from 'apidom';

import MapVisitor from '../generics/MapVisitor';
import FallbackVisitor from '../FallbackVisitor';
import { isReferenceLikeElement, isExampleLikeElement } from '../../predicates';
import { isReferenceElement } from '../../../predicates';
import ReferenceElement from '../../../elements/Reference';

const ExamplesVisitor = stampit(MapVisitor, FallbackVisitor, {
  props: {
    specPath: (element: Element) => {
      // eslint-disable-next-line no-nested-ternary
      return isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : isExampleLikeElement(element)
        ? ['document', 'objects', 'Example']
        : ['value'];
    },
    canSupportSpecificationExtensions: true,
  },
  init() {
    this.element = new ObjectElement();
    this.element.classes.push('examples');
  },
  methods: {
    ObjectElement(objectElement: ObjectElement) {
      // @ts-ignore
      const result = MapVisitor.compose.methods.ObjectElement.call(this, objectElement);

      this.element.filter(isReferenceElement).forEach((referenceElement: ReferenceElement) => {
        referenceElement.setMetaProperty('referenced-element', 'example');
      });

      return result;
    },
  },
});

export default ExamplesVisitor;
