import {
  specificationObj as OpenApi3_1Specification,
  ServerVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';

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

export type { ServerVisitorOptions };

class ServerVisitor extends BaseServerVisitor {
  public declare readonly element: ServerElement;

  constructor(options: ServerVisitorOptions) {
    super(options);
    this.element = new ServerElement();
  }
}

export default ServerVisitor;
