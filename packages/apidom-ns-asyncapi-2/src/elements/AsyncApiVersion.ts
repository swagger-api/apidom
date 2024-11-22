import { StringElement, Attributes, Meta } from '@swagger-api/apidom-core';

/**
 * @public
 */
class AsyncApiVersion extends StringElement {
  constructor(content?: string, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'asyncApiVersion';
    this.classes.push('spec-version');
    this.classes.push('version');
  }
}

export default AsyncApiVersion;
