import stampit from 'stampit';
import { ArrayElement, BREAK, cloneDeep } from '@swagger-api/apidom-core';

import OperationConsumesElement from '../../../../elements/nces/OperationConsumes';
import FallbackVisitor from '../../FallbackVisitor';

const ConsumesVisitor = stampit(FallbackVisitor, {
  init() {
    this.element = new OperationConsumesElement();
  },
  methods: {
    ArrayElement(arrayElement: ArrayElement) {
      this.element = this.element.concat(cloneDeep(arrayElement));

      return BREAK;
    },
  },
});

export default ConsumesVisitor;
