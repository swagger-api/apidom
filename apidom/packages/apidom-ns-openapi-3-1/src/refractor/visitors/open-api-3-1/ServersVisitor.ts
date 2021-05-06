import stampit from 'stampit';
import { ArrayElement, Element, BREAK } from 'apidom';

import SpecificationVisitor from '../SpecificationVisitor';
import FallbackVisitor from '../FallbackVisitor';
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
          this.element.push(item.clone());
        }
      });

      this.copyMetaAndAttributes(arrayElement, this.element);
      this.element.classes.push('servers');

      return BREAK;
    },
  },
});

export default ServersVisitor;
