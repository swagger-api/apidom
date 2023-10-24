import stampit from 'stampit';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';

import SwaggerSecurityElement from '../../../elements/nces/SwaggerSecurity';
import FallbackVisitor from '../FallbackVisitor';
import SpecificationVisitor from '../SpecificationVisitor';

const SecurityVisitor = stampit(SpecificationVisitor, FallbackVisitor, {
  init() {
    this.element = new SwaggerSecurityElement();
  },
  methods: {
    ArrayElement(arrayElement: ArrayElement) {
      arrayElement.forEach((item: Element): void => {
        const specPath = ['document', 'objects', 'SecurityRequirement'];
        const element = this.toRefractedElement(specPath, item);
        this.element.push(element);
      });
      this.copyMetaAndAttributes(arrayElement, this.element);

      return BREAK;
    },
  },
});

export default SecurityVisitor;
