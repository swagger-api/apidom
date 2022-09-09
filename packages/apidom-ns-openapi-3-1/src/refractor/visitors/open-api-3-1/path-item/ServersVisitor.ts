import stampit from 'stampit';
import { PathItemServersElement } from '@swagger-api/apidom-ns-openapi-3-0';

import BaseServersVisitor from '../ServersVisitor';

const ServersVisitor = stampit(BaseServersVisitor, {
  init() {
    this.element = new PathItemServersElement();
  },
});

export default ServersVisitor;
