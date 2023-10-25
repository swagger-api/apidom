import { ArrayElement, Attributes, Meta } from '@swagger-api/apidom-core';

class SwaggerSchemes extends ArrayElement {
  static primaryClass = 'swagger-schemes';

  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(SwaggerSchemes.primaryClass);
  }
}

export default SwaggerSchemes;
