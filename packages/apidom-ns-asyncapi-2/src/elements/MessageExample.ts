import { Attributes, Meta } from 'minim';
import { StringElement, ObjectElement } from '@swagger-api/apidom-core';

class MessageExample extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'messageExample';
  }

  get headers(): ObjectElement | undefined {
    return this.get('headers');
  }

  set headers(headers: ObjectElement | undefined) {
    this.set('headers', headers);
  }

  get payload(): Element | undefined {
    return this.get('payload');
  }

  set payload(payload: Element | undefined) {
    this.set('payload', payload);
  }

  get name(): StringElement {
    return this.get('name');
  }

  set name(name: StringElement) {
    this.set('name', name);
  }

  get summary(): StringElement {
    return this.get('summary');
  }

  set summary(summary: StringElement) {
    this.set('summary', summary);
  }
}

export default MessageExample;
