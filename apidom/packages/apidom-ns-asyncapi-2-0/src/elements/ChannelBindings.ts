import { Attributes, Meta, ObjectElement } from 'minim';

class ChannelBindings extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'channelBindings';
  }
}

export default ChannelBindings;
