import stampit from 'stampit';
import { ArrayElement, BREAK, cloneDeep } from '@swagger-api/apidom-core';

import StepDependsOnElement from '../../../../elements/nces/StepDependsOn';
import FallbackVisitor from '../../FallbackVisitor';

const DependsOnVisitor = stampit(FallbackVisitor, {
  init() {
    this.element = new StepDependsOnElement();
  },
  methods: {
    ArrayElement(arrayElement: ArrayElement) {
      this.element = this.element.concat(cloneDeep(arrayElement));

      return BREAK;
    },
  },
});

export default DependsOnVisitor;
