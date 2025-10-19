import { Attributes, Meta, ObjectElement, StringElement } from '@swagger-api/apidom-core';

/**
 * @public
 */
class MultiFormatSchema extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'MultiformatSchema';
  }

  get schemaForamt(): StringElement | undefined {
    return this.get('schemaForamt')
  }

  set schemaForamt(schemaForamt: StringElement | undefined ) {
     this.set('schemaFormat', schemaForamt);
  }
  
  get schema() {
    return this.get('schema')
  }

  set schema(schema) {
     this.set('schema', schema);
  }
}

export default  MultiFormatSchema;