import stampit from 'stampit';
import { HeaderExamplesElement } from '@swagger-api/apidom-ns-openapi-3-0';

import BaseExamplesVisitor from '../ExamplesVisitor';

const ExamplesVisitor = stampit(BaseExamplesVisitor, {
  init() {
    this.element = new HeaderExamplesElement();
  },
});

export default ExamplesVisitor;
