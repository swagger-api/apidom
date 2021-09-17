import { Attributes, Meta, ObjectElement } from 'minim';

class WebSocketServerBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'webSocketServerBinding';
  }
}

export default WebSocketServerBinding;
