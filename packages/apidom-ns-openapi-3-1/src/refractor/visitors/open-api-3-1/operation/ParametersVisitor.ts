import stampit from 'stampit';
import { OperationParametersElement } from '@swagger-api/apidom-ns-openapi-3-0';

import BaseParametersVisitor from '../ParametersVisitor';

const ParametersVisitor = stampit(BaseParametersVisitor, {
  init() {
    this.element = new OperationParametersElement();
  },
});

export default ParametersVisitor;
