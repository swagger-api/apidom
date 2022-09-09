import stampit from 'stampit';
import { PathItemParametersElement } from '@swagger-api/apidom-ns-openapi-3-0';

import BaseParametersVisitor from '../ParametersVisitor';

const ParametersVisitor = stampit(BaseParametersVisitor, {
  init() {
    this.element = new PathItemParametersElement();
  },
});

export default ParametersVisitor;
