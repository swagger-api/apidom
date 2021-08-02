import { Attributes, Meta, ObjectElement } from 'minim';

class WebSocketOperationBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'webSocketOperationBinding';
  }
}

export default WebSocketOperationBinding;
