import {
  specificationObj as OpenApi3_1Specification,
  ServerVisitorOptions,
  ServerVisitor as ServerVisitorType,
} from '@swagger-api/apidom-ns-openapi-3-1';

import ServerElement from '../../../../elements/Server.ts';

/**
 * @public
 */
export const BaseServerVisitor: typeof ServerVisitorType =
  OpenApi3_1Specification.visitors.document.objects.Server.$visitor;

export type { ServerVisitorOptions };

/**
 * @public
 */
class ServerVisitor extends BaseServerVisitor {
  declare public readonly element: ServerElement;

  constructor(options: ServerVisitorOptions) {
    super(options);
    this.element = new ServerElement();
  }
}

export default ServerVisitor;
