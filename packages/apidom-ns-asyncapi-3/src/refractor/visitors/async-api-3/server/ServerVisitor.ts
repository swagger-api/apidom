import { ServerVisitorOptions } from '@swagger-api/apidom-ns-asyncapi-2';

import ServerElement from '../../../../elements/Server.ts';
import Visitor from '../../Visitor.ts';

/**
 * @public
 */

export type { ServerVisitorOptions };

/**
 * @public
 */
class ServerVisitor extends Visitor {
  declare public readonly element: ServerElement;

  constructor(options: ServerVisitorOptions) {
    super(options);
    this.element = new ServerElement();
  }
}

export default ServerVisitor;
