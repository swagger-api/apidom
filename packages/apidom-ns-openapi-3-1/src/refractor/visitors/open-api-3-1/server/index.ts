import stampit from 'stampit';
import { specificationObj as OpenApi3_1Specification } from '@swagger-api/apidom-ns-openapi-3-0';

import ServerElement from '../../../../elements/Server';

const {
  visitors: {
    document: {
      objects: {
        Server: { $visitor: BaseServerVisitor },
      },
    },
  },
} = OpenApi3_1Specification;

const ServerVisitor = stampit(BaseServerVisitor, {
  init() {
    this.element = new ServerElement();
  },
});

export default ServerVisitor;
