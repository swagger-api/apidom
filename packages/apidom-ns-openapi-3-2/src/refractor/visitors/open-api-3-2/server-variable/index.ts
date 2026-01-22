import {
  specificationObj as OpenApi3_1Specification,
  ServerVariableVisitorOptions,
  ServerVariableVisitor as ServerVariableVisitorType,
} from '@swagger-api/apidom-ns-openapi-3-0';

import ServerVariableElement from '../../../../elements/ServerVariable.ts';

/**
 * @public
 */
export const BaseServerVariableVisitor: typeof ServerVariableVisitorType =
  OpenApi3_1Specification.visitors.document.objects.ServerVariable.$visitor;

export type { ServerVariableVisitorOptions };

/**
 * @public
 */
class ServerVariableVisitor extends BaseServerVariableVisitor {
  declare public readonly element: ServerVariableElement;

  constructor(options: ServerVariableVisitorOptions) {
    super(options);
    this.element = new ServerVariableElement();
  }
}

export default ServerVariableVisitor;
