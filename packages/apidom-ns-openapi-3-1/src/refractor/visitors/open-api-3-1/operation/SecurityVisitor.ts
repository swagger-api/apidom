import stampit from 'stampit';
import { ArrayElement, isObjectElement, BREAK } from '@swagger-api/apidom-core';
import { OperationSecurityElement } from '@swagger-api/apidom-ns-openapi-3-0';

import SpecificationVisitor from '../../SpecificationVisitor';
import FallbackVisitor from '../../FallbackVisitor';

const SecurityVisitor = stampit(SpecificationVisitor, FallbackVisitor, {
  init() {
    this.element = new OperationSecurityElement();
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

      return BREAK;
    },
  },
});

export default SecurityVisitor;
