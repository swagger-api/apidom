import { Attributes, Meta } from 'minim';
import { ObjectElement, Element } from '@swagger-api/apidom-core';

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

  get example(): Element {
    return this.get('example');
  }

  set example(example: Element) {
    this.set('example', example);
  }

  get examples(): ObjectElement {
    return this.get('examples');
  }

  set examples(examples: ObjectElement) {
    this.set('examples', examples);
  }

  get encoding(): ObjectElement {
    return this.get('encoding');
  }

  set encoding(encoding: ObjectElement) {
    this.set('encoding', encoding);
  }
}

export default MediaType;
