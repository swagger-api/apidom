import { ObjectElement, Element, Attributes, Meta } from '@swagger-api/apidom-core';

import SchemaElement from './Schema.ts';
import ReferenceElement from './Reference.ts';

/**
 * @public
 */
class MediaType extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'mediaType';
  }

  get schema(): SchemaElement | ReferenceElement | undefined {
    return this.get('schema');
  }

  set schema(schema: SchemaElement | ReferenceElement | undefined) {
    this.set('schema', schema);
  }

  get example(): Element | undefined {
    return this.get('example');
  }

  set example(example: Element | undefined) {
    this.set('example', example);
  }

  get examples(): ObjectElement | undefined {
    return this.get('examples');
  }

  set examples(examples: ObjectElement | undefined) {
    this.set('examples', examples);
  }

  get encoding(): ObjectElement | undefined {
    return this.get('encoding');
  }

  set encoding(encoding: ObjectElement | undefined) {
    this.set('encoding', encoding);
  }
}

export default MediaType;
