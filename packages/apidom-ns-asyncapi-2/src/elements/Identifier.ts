import { StringElement, Attributes, Meta } from '@swagger-api/apidom-core';

/**
 * @public
 */
class Identifier extends StringElement {
  constructor(content?: string, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'identifier';
  }
}

export default Identifier;
