import stampit from 'stampit';
import { ArrayElement, Element, BREAK } from '@swagger-api/apidom-core';

import { isReferenceLikeElement } from '../../../predicates';
import { isReferenceElement } from '../../../../predicates';
import OperationParametersElement from '../../../../elements/nces/OperationParameters';
import FallbackVisitor from '../../FallbackVisitor';
import SpecificationVisitor from '../../SpecificationVisitor';

const ParametersVisitor = stampit(SpecificationVisitor, FallbackVisitor, {
  init() {
    this.element = new OperationParametersElement();
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
