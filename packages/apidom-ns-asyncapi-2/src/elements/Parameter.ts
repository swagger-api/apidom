import { StringElement, ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

import SchemaElement from './Schema.ts';
import ReferenceElement from './Reference.ts';

/**
 * @public
 */
class Parameter extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'parameter';
  }

  get description(): StringElement | undefined {
    return this.get('description');
  }

  set description(description: StringElement | undefined) {
    this.set('description', description);
  }

  get schema(): SchemaElement | ReferenceElement | undefined {
    return this.get('schema');
  }

  set schema(schema: SchemaElement | ReferenceElement | undefined) {
    this.set('schema', schema);
  }

  get location(): StringElement | undefined {
    return this.get('location');
  }

  set location(location: StringElement | undefined) {
    this.set('location', location);
  }
}

export default Parameter;
