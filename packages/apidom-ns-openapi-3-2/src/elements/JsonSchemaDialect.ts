import { StringElement, Attributes, Meta } from '@swagger-api/apidom-core';

/**
 * @public
 */
class JsonSchemaDialect extends StringElement {
  static default = new JsonSchemaDialect('https://spec.openapis.org/oas/3.2/dialect/2025-09-17');

  constructor(content?: string, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'jsonSchemaDialect';
  }
}

export default JsonSchemaDialect;
