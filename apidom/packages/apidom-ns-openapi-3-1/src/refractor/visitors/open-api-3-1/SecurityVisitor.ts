import stampit from 'stampit';
import { ArrayElement, isObjectElement, BREAK } from 'apidom';

import SpecificationVisitor from '../SpecificationVisitor';
import FallbackVisitor from '../FallbackVisitor';

const SecurityVisitor = stampit(SpecificationVisitor, FallbackVisitor, {
  init() {
    this.element = new ArrayElement();
  },
  methods: {
    ArrayElement(arrayElement: ArrayElement) {
      arrayElement.forEach((item) => {
        if (isObjectElement(item)) {
          const element = this.toRefractedElement(
            ['document', 'objects', 'SecurityRequirement'],
            item,
          );
          this.element.push(element);
        } else {
          this.element.push(item.clone());
        }
      });

      this.copyMetaAndAttributes(arrayElement, this.element);
      this.element.classes.push('security');

      return BREAK;
    },
  },
});

export default SecurityVisitor;
