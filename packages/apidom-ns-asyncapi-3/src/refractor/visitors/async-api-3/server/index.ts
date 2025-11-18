import {
  specificationObj as AsyncApi2Specification,
  ServerVisitor as ServerVisitorType,
  ServerVisitorOptions,
} from '@swagger-api/apidom-ns-asyncapi-2';

import ServerElement from '../../../../elements/Server.ts';

/**
 * @public
 */
export const BaseServerVisitor: typeof ServerVisitorType =
  AsyncApi2Specification.visitors.document.objects.Server.$visitor;

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
