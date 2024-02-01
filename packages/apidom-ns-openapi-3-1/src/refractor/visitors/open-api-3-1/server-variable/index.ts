import {
  specificationObj as OpenApi3_1Specification,
  ServerVariableVisitorOptions,
} from '@swagger-api/apidom-ns-openapi-3-0';

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

export type { ServerVariableVisitorOptions };
class ServerVariableVisitor extends BaseServerVariableVisitor {
  public declare readonly element: ServerVariableElement;

  constructor(options: ServerVariableVisitorOptions) {
    super(options);
    this.element = new ServerVariableElement();
  }
}

export default ServerVariableVisitor;
