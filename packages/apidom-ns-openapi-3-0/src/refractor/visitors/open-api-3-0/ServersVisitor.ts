import stampit from 'stampit';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';

import ServersElement from '../../../elements/nces/Servers';
import SpecificationVisitor from '../SpecificationVisitor';
import FallbackVisitor from '../FallbackVisitor';
import { isServerLikeElement } from '../../predicates';

const ServersVisitor = stampit(SpecificationVisitor, FallbackVisitor, {
  init() {
    this.element = new ServersElement();
  },
  methods: {
    ArrayElement(arrayElement: ArrayElement) {
      arrayElement.forEach((item: Element) => {
        const specPath = isServerLikeElement(item) ? ['document', 'objects', 'Server'] : ['value'];
        const element = this.toRefractedElement(specPath, item);

        this.element.push(element);
      });

      this.copyMetaAndAttributes(arrayElement, this.element);

      return BREAK;
    },
  },
});

export default ServersVisitor;
