import { ArrayElement, Attributes, Meta } from '@swagger-api/apidom-core';

class SwaggerSecurity extends ArrayElement {
  static primaryClass = 'swagger-security';

  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.classes.push(SwaggerSecurity.primaryClass);
    this.classes.push('security');
  }
}

export default SwaggerSecurity;
