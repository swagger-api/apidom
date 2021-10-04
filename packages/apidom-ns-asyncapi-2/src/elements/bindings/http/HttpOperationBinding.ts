import { Attributes, Meta } from 'minim';
import { StringElement, ObjectElement } from '@swagger-api/apidom-core';

import SchemaElement from '../../Schema';

class HttpOperationBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'httpOperationBinding';
  }

  get type(): StringElement {
    return this.get('type');
  }

  set type(type: StringElement) {
    this.set('type', type);
  }

  get method(): StringElement {
    return this.get('method');
  }

  set method(method: StringElement) {
    this.set('method', method);
  }

  get query(): SchemaElement {
    return this.get('query');
  }

  set query(query: SchemaElement) {
    this.set('query', query);
  }

  get bindingVersion(): StringElement {
    return this.get('bindingVersion');
  }

  set bindingVersion(bindingVersion: StringElement) {
    this.set('bindingVersion', bindingVersion);
  }
}

export default HttpOperationBinding;
