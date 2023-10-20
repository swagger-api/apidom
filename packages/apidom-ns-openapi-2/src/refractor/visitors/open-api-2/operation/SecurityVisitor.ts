import stampit from 'stampit';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';

import OperationSecurityElement from '../../../../elements/nces/OperationSecurity';
import FallbackVisitor from '../../FallbackVisitor';
import SpecificationVisitor from '../../SpecificationVisitor';

const SecurityRequirementVisitor = stampit(SpecificationVisitor, FallbackVisitor, {
  init() {
    this.element = new OperationSecurityElement();
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

export default SecurityRequirementVisitor;
