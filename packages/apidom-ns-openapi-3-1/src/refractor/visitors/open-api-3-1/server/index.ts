import {
  specificationObj as OpenApi3_1Specification,
  FixedFieldsVisitorOptions,
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

class ServerVisitor extends BaseServerVisitor {
  public declare readonly element: ServerElement;

  constructor(options: FixedFieldsVisitorOptions) {
    super(options);
    this.element = new ServerElement();
  }
}

export default ServerVisitor;
