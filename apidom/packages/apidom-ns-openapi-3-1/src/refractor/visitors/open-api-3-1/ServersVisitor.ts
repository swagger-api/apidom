import stampit from 'stampit';
import { ArrayElement, Element, BREAK } from 'apidom';

import SpecificationVisitor from '../SpecificationVisitor';
import FallbackVisitor from '../FallbackVisitor';
import { appendMetadata } from '../../metadata';
import { isServerLikeElement } from '../../predicates';

const ServersVisitor = stampit(SpecificationVisitor, FallbackVisitor, {
  init() {
    this.element = new ArrayElement();
  },
  methods: {
    ArrayElement(arrayElement: ArrayElement) {
      arrayElement.forEach((item: Element) => {
        if (isServerLikeElement(item)) {
          const serverElement = this.toRefractedElement(['document', 'objects', 'Server'], item);
          this.element.push(serverElement);
        } else {
          this.element.push(item);
        }
      });

      this.copyMetaAndAttributes(arrayElement, this.element);
      appendMetadata(['servers'], this.element);

      return BREAK;
    },
  },
});

export default ServersVisitor;
