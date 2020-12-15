import { Attributes, Meta, ObjectElement, StringElement } from 'minim';

import SchemaElement from './Schema';

class Parameter extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'parameter';
  }

  get description(): StringElement {
    return this.get('description');
  }

  set description(description: StringElement) {
    this.set('description', description);
  }

  get schema(): SchemaElement {
    return this.get('schema');
  }

  set schema(schema: SchemaElement) {
    this.set('schema', schema);
  }

  get location(): StringElement {
    return this.get('location');
  }

  set location(location: StringElement) {
    this.set('location', location);
  }
}

export default Parameter;
