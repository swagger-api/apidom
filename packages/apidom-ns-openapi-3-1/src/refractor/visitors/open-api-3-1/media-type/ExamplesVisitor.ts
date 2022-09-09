import stampit from 'stampit';
import { MediaTypeExamplesElement } from '@swagger-api/apidom-ns-openapi-3-0';

import BaseExamplesVisitor from '../ExamplesVisitor';

const ExamplesVisitor = stampit(BaseExamplesVisitor, {
  init() {
    this.element = new MediaTypeExamplesElement();
  },
});

export default ExamplesVisitor;
