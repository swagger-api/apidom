import { StringElement, Attributes, Meta } from '@swagger-api/apidom-core';

class SwaggerVersion extends StringElement {
  constructor(content?: string, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'swaggerVersion';
    this.classes.push('spec-version');
    this.classes.push('version');
  }
}

export default SwaggerVersion;
