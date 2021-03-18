import { Attributes, Meta, ObjectElement } from 'minim';

import SchemaElement from './Schema';

class MediaType extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'mediaType';
  }

  get schema(): SchemaElement {
    return this.get('schema');
  }

  set schema(schema: SchemaElement) {
    this.set('schema', schema);
  }
}

export default MediaType;
