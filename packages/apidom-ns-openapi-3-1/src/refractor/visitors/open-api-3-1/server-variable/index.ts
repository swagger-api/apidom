import stampit from 'stampit';
import { specificationObj as OpenApi3_1Specification } from '@swagger-api/apidom-ns-openapi-3-0';

import ServerVariableElement from '../../../../elements/ServerVariable';

const {
  visitors: {
    document: {
      objects: {
        ServerVariable: { $visitor: BaseServerVariableVisitor },
      },
    },
  },
} = OpenApi3_1Specification;

const ServerVariableVisitor = stampit(BaseServerVariableVisitor, {
  init() {
    this.element = new ServerVariableElement();
  },
});

export default ServerVariableVisitor;
