import { Attributes, Meta, ObjectElement } from 'minim';

class MqttChannelBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'mqttChannelBinding';
  }
}

export default MqttChannelBinding;
