import { ArrayElement, Attributes, Meta } from '@swagger-api/apidom-core';

class SwaggerTags extends ArrayElement {
  static primaryClass = 'swagger-tags';

  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(SwaggerTags.primaryClass);
  }
}

export default SwaggerTags;
