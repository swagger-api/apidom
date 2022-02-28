import stampit from 'stampit';
import { ArrayElement, BREAK, Element } from '@swagger-api/apidom-core';

import FallbackVisitor from '../../FallbackVisitor';
import SpecificationVisitor from '../../SpecificationVisitor';
import StandardIdentifierElement from '../../../../elements/StandardIdentifier';

const StandardIdentifierVisitor = stampit(SpecificationVisitor, FallbackVisitor, {
  init() {
    this.element = new StandardIdentifierElement();
  },
  methods: {
    ArrayElement(arrayElement: ArrayElement) {
      arrayElement.forEach((item: Element): void => {
        const specPath = ['document', 'objects', 'StandardIdentifier'];
        const element = this.toRefractedElement(specPath, item);

        this.element.push(element);
      });

      this.copyMetaAndAttributes(arrayElement, this.element);

      return BREAK;
    },
  },
});

export default StandardIdentifierVisitor;
