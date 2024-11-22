import { ArrayElement, Attributes, Meta } from '@swagger-api/apidom-core';

/**
 * @public
 */
class SwaggerTags extends ArrayElement {
  static primaryClass = 'swagger-tags';

  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(SwaggerTags.primaryClass);
  }
}

export default SwaggerTags;
