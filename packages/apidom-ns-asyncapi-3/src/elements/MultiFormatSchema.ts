import { Attributes, Meta, ObjectElement, StringElement } from '@swagger-api/apidom-core';

/**
 * @public
 */
class MultiFormatSchema extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'multiformatSchema';
  }

  get schemaFormat(): StringElement | undefined {
    return this.get('schemaForamt');
  }

  set schemaFormat(schemaFormat: StringElement | undefined) {
    this.set('schemaFormat', schemaFormat);
  }

  get schema() {
    return this.get('schema');
  }

  set schema(schema) {
    this.set('schema', schema);
  }
}

export default MultiFormatSchema;
