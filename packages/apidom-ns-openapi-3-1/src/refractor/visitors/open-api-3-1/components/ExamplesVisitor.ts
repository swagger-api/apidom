import stampit from 'stampit';
import { ComponentsExamplesElement } from '@swagger-api/apidom-ns-openapi-3-0';

import BaseExamplesVisitor from '../ExamplesVisitor';

const ExamplesVisitor = stampit(BaseExamplesVisitor, {
  init() {
    this.element = new ComponentsExamplesElement();
  },
});

export default ExamplesVisitor;
