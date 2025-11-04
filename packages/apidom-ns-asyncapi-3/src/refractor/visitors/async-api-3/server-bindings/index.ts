import {
  specificationObj as AsyncApi2Specification,
  ServerBindingsVisitorOptions,
  ServerBindingsVisitor as ServerBindingsVisitorType,
} from '@swagger-api/apidom-ns-asyncapi-2';

import ServerBindingsElement from '../../../../elements/ServerBindings.ts';

export const BaseServerBindingsVisitor: typeof ServerBindingsVisitorType =
  AsyncApi2Specification.visitors.document.objects.ServerBindings.$visitor;

export type { ServerBindingsVisitorOptions };

/**
 * @public
 */
class ServerBindingsVisitor extends BaseServerBindingsVisitor {
  declare public readonly element: ServerBindingsElement;

  constructor(options: ServerBindingsVisitorOptions) {
    super(options);
    this.element = new ServerBindingsElement();
  }
}

export default ServerBindingsVisitor;