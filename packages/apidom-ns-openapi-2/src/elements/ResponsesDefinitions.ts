import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

class ResponsesDefinitions extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'responsesDefinitions';
  }
}

export default ResponsesDefinitions;
