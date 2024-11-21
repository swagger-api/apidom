import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

/**
 * @public
 */
class ResponseContent extends ObjectElement {
  static primaryClass = 'response-content';

  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(ResponseContent.primaryClass);
    this.classes.push('content');
  }
}

export default ResponseContent;
