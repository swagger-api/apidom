import { StringElement, Attributes, Meta } from '@swagger-api/apidom-core';

/**
 * @public
 */
class Openapi extends StringElement {
  constructor(content?: string, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'openapi';
    this.classes.push('spec-version');
    this.classes.push('version');
  }
}

export default Openapi;
