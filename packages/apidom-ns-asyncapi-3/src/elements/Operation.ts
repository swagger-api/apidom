import {
  ArrayElement,
  Attributes,
  Meta,
  ObjectElement,
  StringElement,
} from '@swagger-api/apidom-core';

import ReferenceElement from './Reference.ts';

/**
 * @public
 */
class Operation extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'operation';
  }

  get action(): 'send' | 'receive' | undefined {
    return this.get('action');
  }

  set action(value: 'send' | 'receive' | undefined) {
    this.set('action', value);
  }

  get channel(): ReferenceElement | undefined {
    return this.get('channel');
  }

  set channel(channel: ReferenceElement | undefined) {
    this.set('channel', channel);
  }

  get title(): StringElement | undefined {
    return this.get('title');
  }

  set title(title: StringElement | undefined) {
    this.set('title', title);
  }

  get summary(): StringElement | undefined {
    return this.get('summary');
  }

  set summary(summary: StringElement | undefined) {
    this.set('summary', summary);
  }

  get description(): StringElement | undefined {
    return this.get('description');
  }

  set description(description: StringElement | undefined) {
    this.set('description', description);
  }

  get security(): ArrayElement | undefined {
    return this.get('security');
  }

  set security(security: ArrayElement | undefined) {
    this.set('security', security);
  }

  get messages(): ArrayElement | undefined {
    return this.get('messages');
  }

  set messages(message: ArrayElement | undefined) {
    this.set('messages', message);
  }

  get traits(): ArrayElement | undefined {
    return this.get('traits');
  }

  set traits(OperationTrait: ArrayElement | undefined) {
    this.set('traits', OperationTrait);
  }
}

export default Operation;
