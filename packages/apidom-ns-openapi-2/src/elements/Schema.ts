import { Attributes, Meta } from '@swagger-api/apidom-core';
import { JSONSchemaElement } from '@swagger-api/apidom-ns-json-schema-draft-4';

class Schema extends JSONSchemaElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'schema';
    this.classes.push('json-schema-draft-4');
  }
}

export default Schema;
