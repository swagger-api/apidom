import { StringElement, Attributes, Meta } from '@swagger-api/apidom-core';
import { ServerElement } from '@swagger-api/apidom-ns-openapi-3-1';

/**
 * @public
 */
class Server extends ServerElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
  }

  /**
   * OpenAPI 3.2: Name to identify this server.
   */
  get name(): StringElement | undefined {
    return this.get('name');
  }

  set name(name: StringElement | undefined) {
    this.set('name', name);
  }
}

export default Server;
