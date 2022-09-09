import stampit from 'stampit';
import { ParameterContentElement } from '@swagger-api/apidom-ns-openapi-3-0';

import BaseContentVisitor from '../ContentVisitor';

const ExamplesVisitor = stampit(BaseContentVisitor, {
  init() {
    this.element = new ParameterContentElement();
  },
});

export default ExamplesVisitor;
