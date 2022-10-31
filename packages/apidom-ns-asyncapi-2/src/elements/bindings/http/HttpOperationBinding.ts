import { StringElement, ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

import SchemaElement from '../../Schema';
import ReferenceElement from '../../Reference';

class HttpOperationBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'httpOperationBinding';
    this.classes.push('operation-binding');
  }

  get type(): StringElement | undefined {
    return this.get('type');
  }

  set type(type: StringElement | undefined) {
    this.set('type', type);
  }

  get method(): StringElement | undefined {
    return this.get('method');
  }

  set method(method: StringElement | undefined) {
    this.set('method', method);
  }

  get query(): SchemaElement | ReferenceElement | undefined {
    return this.get('query');
  }

  set query(query: SchemaElement | ReferenceElement | undefined) {
    this.set('query', query);
  }

  get bindingVersion(): StringElement | undefined {
    return this.get('bindingVersion');
  }

  set bindingVersion(bindingVersion: StringElement | undefined) {
    this.set('bindingVersion', bindingVersion);
  }
}

export default HttpOperationBinding;
