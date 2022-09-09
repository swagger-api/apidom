import stampit from 'stampit';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';
import { isReferenceLikeElement } from '@swagger-api/apidom-ns-openapi-3-0';

import FallbackVisitor from '../FallbackVisitor';
import SpecificationVisitor from '../SpecificationVisitor';
import { isReferenceElement } from '../../../predicates';

const ParametersVisitor = stampit(SpecificationVisitor, FallbackVisitor, {
  init() {
    this.element = new ArrayElement();
    this.element.classes.push('parameters');
  },
  methods: {
    ArrayElement(arrayElement: ArrayElement) {
      arrayElement.forEach((item: Element): void => {
        const specPath = isReferenceLikeElement(item)
          ? ['document', 'objects', 'Reference']
          : ['document', 'objects', 'Parameter'];
        const element = this.toRefractedElement(specPath, item);

        if (isReferenceElement(element)) {
          element.setMetaProperty('referenced-element', 'parameter');
        }

        this.element.push(element);
      });

      this.copyMetaAndAttributes(arrayElement, this.element);

      return BREAK;
    },
  },
});

export default ParametersVisitor;
