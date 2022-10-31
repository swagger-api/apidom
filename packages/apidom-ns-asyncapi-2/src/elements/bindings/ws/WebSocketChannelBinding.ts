import { StringElement, ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

import SchemaElement from '../../Schema';
import ReferenceElement from '../../Reference';

class WebSocketChannelBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'webSocketChannelBinding';
    this.classes.push('channel-binding');
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

  get headers(): SchemaElement | ReferenceElement | undefined {
    return this.get('headers');
  }

  set headers(headers: SchemaElement | ReferenceElement | undefined) {
    this.set('headers', headers);
  }

  get bindingVersion(): StringElement | undefined {
    return this.get('bindingVersion');
  }

  set bindingVersion(bindingVersion: StringElement | undefined) {
    this.set('bindingVersion', bindingVersion);
  }
}

export default WebSocketChannelBinding;
