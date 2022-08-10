import { ObjectElement, StringElement, Attributes, Meta } from '@swagger-api/apidom-core';

import JSONSchema from './JSONSchema';

/**
 * URI: https://datatracker.ietf.org/doc/html/draft-luff-json-hyper-schema-00#section-5
 */

class LinkDescription extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'linkDescription';
  }

  get href(): StringElement | undefined {
    return this.get('href');
  }

  set href(href: StringElement | undefined) {
    this.set('href', href);
  }

  get rel(): StringElement | undefined {
    return this.get('rel');
  }

  set rel(rel: StringElement | undefined) {
    this.set('rel', rel);
  }

  get title(): StringElement | undefined {
    return this.get('title');
  }

  set title(title: StringElement | undefined) {
    this.set('title', title);
  }

  get targetSchema(): JSONSchema | undefined {
    return this.get('targetSchema');
  }

  set targetSchema(targetSchema: JSONSchema | undefined) {
    this.set('targetSchema', targetSchema);
  }

  get mediaType(): StringElement | undefined {
    return this.get('mediaType');
  }

  set mediaType(mediaType: StringElement | undefined) {
    this.set('mediaType', mediaType);
  }

  get method(): StringElement | undefined {
    return this.get('method');
  }

  set method(method: StringElement | undefined) {
    this.set('method', method);
  }

  get encType(): StringElement | undefined {
    return this.get('encType');
  }

  set encType(encType: StringElement | undefined) {
    this.set('encType', encType);
  }

  get schema(): JSONSchema | undefined {
    return this.get('schema');
  }

  set schema(schema: JSONSchema | undefined) {
    this.set('schema', schema);
  }
}

export default LinkDescription;
