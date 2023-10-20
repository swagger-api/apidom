import stampit from 'stampit';
import { ArrayElement, BREAK, cloneDeep } from '@swagger-api/apidom-core';

import OperationSchemesElement from '../../../../elements/nces/OperationSchemes';
import FallbackVisitor from '../../FallbackVisitor';

const SchemesVisitor = stampit(FallbackVisitor, {
  init() {
    this.element = new OperationSchemesElement();
  },
  methods: {
    ArrayElement(arrayElement: ArrayElement) {
      this.element = this.element.concat(cloneDeep(arrayElement));

      return BREAK;
    },
  },
});

export default SchemesVisitor;
