import { StringElement, ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

import SchemaElement from '../../Schema';

class WebSocketChannelBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'webSocketChannelBinding';
    this.classes.push('channel-binding');
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

  get headers(): SchemaElement {
    return this.get('headers');
  }

  set headers(headers: SchemaElement) {
    this.set('headers', headers);
  }

  get bindingVersion(): StringElement {
    return this.get('bindingVersion');
  }

  set bindingVersion(bindingVersion: StringElement) {
    this.set('bindingVersion', bindingVersion);
  }
}

export default WebSocketChannelBinding;
