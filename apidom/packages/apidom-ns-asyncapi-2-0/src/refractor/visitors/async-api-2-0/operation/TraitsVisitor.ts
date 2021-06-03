import stampit from 'stampit';
import { ArrayElement, Element, BREAK } from 'apidom';

import SpecificationVisitor from '../../SpecificationVisitor';
import FallbackVisitor from '../../FallbackVisitor';
import { isReferenceLikeElement } from '../../../predicates';

const TraitsVisitor = stampit(SpecificationVisitor, FallbackVisitor, {
  init() {
    this.element = new ArrayElement();
    this.element.classes.push('operation-traits');
  },
  methods: {
    ArrayElement(arrayElement: ArrayElement) {
      arrayElement.forEach((item: Element) => {
        let element;

        if (isReferenceLikeElement(item)) {
          element = this.toRefractedElement(['document', 'objects', 'Reference'], item);
          element.setMetaProperty('referenced-element', 'operationTrait');
        } else {
          element = this.toRefractedElement(['document', 'objects', 'OperationTrait'], item);
        }

        this.element.push(element);
      });

      this.copyMetaAndAttributes(arrayElement, this.element);

      return BREAK;
    },
  },
});

export default TraitsVisitor;
