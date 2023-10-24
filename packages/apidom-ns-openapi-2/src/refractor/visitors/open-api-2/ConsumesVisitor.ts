import stampit from 'stampit';
import { ArrayElement, BREAK, cloneDeep } from '@swagger-api/apidom-core';

import SwaggerConsumesElement from '../../../elements/nces/SwaggerConsumes';
import FallbackVisitor from '../FallbackVisitor';

const ConsumesVisitor = stampit(FallbackVisitor, {
  init() {
    this.element = new SwaggerConsumesElement();
  },
  methods: {
    ArrayElement(arrayElement: ArrayElement) {
      this.element = this.element.concat(cloneDeep(arrayElement));

      return BREAK;
    },
  },
});

export default ConsumesVisitor;
