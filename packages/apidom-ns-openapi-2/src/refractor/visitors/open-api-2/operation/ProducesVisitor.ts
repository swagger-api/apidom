import stampit from 'stampit';
import { ArrayElement, BREAK, cloneDeep } from '@swagger-api/apidom-core';

import OperationProducesElement from '../../../../elements/nces/OperationProduces';
import FallbackVisitor from '../../FallbackVisitor';

const ProducesVisitor = stampit(FallbackVisitor, {
  init() {
    this.element = new OperationProducesElement();
  },
  methods: {
    ArrayElement(arrayElement: ArrayElement) {
      this.element = this.element.concat(cloneDeep(arrayElement));

      return BREAK;
    },
  },
});

export default ProducesVisitor;
