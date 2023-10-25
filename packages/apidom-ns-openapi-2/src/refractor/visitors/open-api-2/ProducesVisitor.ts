import stampit from 'stampit';
import { ArrayElement, BREAK, cloneDeep } from '@swagger-api/apidom-core';

import SwaggerProducesElement from '../../../elements/nces/SwaggerProduces';
import FallbackVisitor from '../FallbackVisitor';

const ProducesVisitor = stampit(FallbackVisitor, {
  init() {
    this.element = new SwaggerProducesElement();
  },
  methods: {
    ArrayElement(arrayElement: ArrayElement) {
      this.element = this.element.concat(cloneDeep(arrayElement));

      return BREAK;
    },
  },
});

export default ProducesVisitor;
