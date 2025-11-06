import { ObjectElement, Attributes, Meta, ArrayElement } from '@swagger-api/apidom-core';

import OperationReplyAddress from './OperationReplyAddress.ts';
import ReferenceElement from './Reference.ts';

/**
 * @public
 */
class OperationReply extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'operationReply';
  }

  get address(): OperationReplyAddress | ReferenceElement | undefined {
    return this.get('address');
  }

  set address(address: OperationReplyAddress | ReferenceElement | undefined) {
    this.set('address', address);
  }

  get channel(): ReferenceElement | undefined {
    return this.get('channel');
  }

  set channel(channel: ReferenceElement | undefined) {
    this.set('channel', channel);
  }

  get messages(): ArrayElement | undefined {
    return this.get('messages');
  }

  set messages(messages: ArrayElement | undefined) {
    this.set('messages', messages);
  }
}

export default OperationReply;
