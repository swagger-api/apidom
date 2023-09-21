import stampit from 'stampit';
import { ArrayElement, isObjectElement, BREAK, cloneDeep } from '@swagger-api/apidom-core';

import SecurityElement from '../../../elements/nces/Security';
import SpecificationVisitor from '../SpecificationVisitor';
import FallbackVisitor from '../FallbackVisitor';

const SecurityVisitor = stampit(SpecificationVisitor, FallbackVisitor, {
  init() {
    this.element = new SecurityElement();
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
          this.element.push(cloneDeep(item));
        }
      });

      this.copyMetaAndAttributes(arrayElement, this.element);

      return BREAK;
    },
  },
});

export default SecurityVisitor;
