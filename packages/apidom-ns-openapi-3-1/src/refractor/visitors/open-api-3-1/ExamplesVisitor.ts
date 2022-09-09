import stampit from 'stampit';
import { Element, ObjectElement } from '@swagger-api/apidom-core';
import { isReferenceLikeElement } from '@swagger-api/apidom-ns-openapi-3-0';

import MapVisitor from '../generics/MapVisitor';
import FallbackVisitor from '../FallbackVisitor';
import { isReferenceElement } from '../../../predicates';
import ReferenceElement from '../../../elements/Reference';

const ExamplesVisitor = stampit(MapVisitor, FallbackVisitor, {
  props: {
    specPath: (element: Element) =>
      isReferenceLikeElement(element)
        ? ['document', 'objects', 'Reference']
        : ['document', 'objects', 'Example'],
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
