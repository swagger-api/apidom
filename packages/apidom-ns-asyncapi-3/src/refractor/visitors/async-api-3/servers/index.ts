import {
  specificationObj as AsyncApi2Specification,
  ServersVisitor as ServersVisitorType,
  ServersVisitorOptions,
} from '@swagger-api/apidom-ns-asyncapi-2';

import ServersElement from '../../../../elements/Servers.ts';

/**
 * @public
 */
export const BaseServersVisitor: typeof ServersVisitorType =
  AsyncApi2Specification.visitors.document.objects.Servers.$visitor;

export type { ServersVisitorOptions };

/**
 * @public
 */
class ServersVisitor extends BaseServersVisitor {
  declare public readonly element: ServersElement;

  constructor(options: ServersVisitorOptions) {
    super(options);
    this.element = new ServersElement();
    this.element.classes.push('servers');
  }
}

export default ServersVisitor;
