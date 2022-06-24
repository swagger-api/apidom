import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

class WebSocketOperationBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'webSocketOperationBinding';
    this.classes.push('operation-binding');
  }
}

export default WebSocketOperationBinding;
