import stampit from 'stampit';
import { ArrayElement, BREAK, cloneDeep } from '@swagger-api/apidom-core';

import SwaggerSchemesElement from '../../../elements/nces/SwaggerSchemes';
import FallbackVisitor from '../FallbackVisitor';

const SchemesVisitor = stampit(FallbackVisitor, {
  init() {
    this.element = new SwaggerSchemesElement();
  },
  methods: {
    ArrayElement(arrayElement: ArrayElement) {
      this.element = this.element.concat(cloneDeep(arrayElement));

      return BREAK;
    },
  },
});

export default SchemesVisitor;
