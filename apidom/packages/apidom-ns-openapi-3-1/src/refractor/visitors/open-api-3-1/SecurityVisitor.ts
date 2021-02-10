import stampit from 'stampit';
import { ArrayElement, isObjectElement } from 'apidom';

import SpecificationVisitor from '../SpecificationVisitor';
import FallbackVisitor from '../FallbackVisitor';
import { BREAK } from '../../../traversal/visitor';
import { appendMetadata } from '../../metadata';

const SecurityVisitor = stampit(SpecificationVisitor, FallbackVisitor, {
  init() {
    this.element = new ArrayElement();
  },
  methods: {
    array(arrayElement: ArrayElement) {
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
      appendMetadata(['security'], this.element);

      return BREAK;
    },
  },
});

export default SecurityVisitor;
