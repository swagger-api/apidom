import { StringElement, ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

import SchemaElement from './Schema';
import HeadersElement from './Headers';
import ExampleElement from './Example';

class Response extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'response';
  }

  get description(): StringElement | undefined {
    return this.get('description');
  }

  set description(description: StringElement | undefined) {
    this.set('description', description);
  }

  get schema(): SchemaElement | undefined {
    return this.get('schema');
  }

  set schema(schema: SchemaElement | undefined) {
    this.set('schema', schema);
  }

  get headers(): HeadersElement | undefined {
    return this.get('headers');
  }

  set headers(headers: HeadersElement | undefined) {
    this.set('headers', headers);
  }

  get examples(): ExampleElement | undefined {
    return this.get('examples');
  }

  set examples(examples: ExampleElement | undefined) {
    this.set('examples', examples);
  }
}

export default Response;
