import { ArrayElement, Attributes, Meta } from '@swagger-api/apidom-core';

class SwaggerConsumes extends ArrayElement {
  static primaryClass = 'swagger-consumes';

  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(SwaggerConsumes.primaryClass);
  }
}

export default SwaggerConsumes;
