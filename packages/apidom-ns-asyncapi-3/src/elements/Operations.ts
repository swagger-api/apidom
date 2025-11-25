import { Attributes, Meta, ObjectElement } from '@swagger-api/apidom-core';

/**
 * @public
 */
class Operations extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'operations';
  }
}

export default Operations;
