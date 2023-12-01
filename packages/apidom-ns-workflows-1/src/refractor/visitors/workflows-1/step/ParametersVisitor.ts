import stampit from 'stampit';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';

import FallbackVisitor from '../../FallbackVisitor';
import SpecificationVisitor from '../../SpecificationVisitor';
import { isReferenceLikeElement } from '../../../predicates';
import { isReferenceElement } from '../../../../predicates';
import StepParametersElement from '../../../../elements/nces/StepParameters';

const ParametersVisitor = stampit(SpecificationVisitor, FallbackVisitor, {
  init() {
    this.element = new StepParametersElement();
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
