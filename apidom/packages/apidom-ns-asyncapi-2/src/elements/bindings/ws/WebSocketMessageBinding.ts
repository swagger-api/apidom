import { Attributes, Meta, ObjectElement } from 'minim';

class WebSocketMessageBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'webSocketMessageBinding';
  }
}

export default WebSocketMessageBinding;
