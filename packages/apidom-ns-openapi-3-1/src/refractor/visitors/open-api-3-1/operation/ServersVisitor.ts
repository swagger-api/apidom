import stampit from 'stampit';
import { OperationServersElement } from '@swagger-api/apidom-ns-openapi-3-0';

import BaseServersVisitor from '../ServersVisitor';

const ServersVisitor = stampit(BaseServersVisitor, {
  init() {
    this.element = new OperationServersElement();
  },
});

export default ServersVisitor;
