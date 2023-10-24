import { ArrayElement, Attributes, Meta } from '@swagger-api/apidom-core';

class SwaggerProduces extends ArrayElement {
  static primaryClass = 'swagger-produces';

  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(SwaggerProduces.primaryClass);
  }
}

export default SwaggerProduces;
