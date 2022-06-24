import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

class MqttChannelBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'mqttChannelBinding';
    this.classes.push('channel-binding');
  }
}

export default MqttChannelBinding;
