import {
  StringElement,
  ObjectElement,
  BooleanElement,
  NumberElement,
  Attributes,
  Meta,
} from '@swagger-api/apidom-core';

class MqttOperationBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'mqttOperationBinding';
    this.classes.push('operation-binding');
  }

  get qos(): NumberElement | undefined {
    return this.get('qos');
  }

  set qos(qos: NumberElement | undefined) {
    this.set('qos', qos);
  }

  get retain(): BooleanElement | undefined {
    return this.get('retain');
  }

  set retain(retain: BooleanElement | undefined) {
    this.set('retain', retain);
  }

  get bindingVersion(): StringElement | undefined {
    return this.get('bindingVersion');
  }

  set bindingVersion(bindingVersion: StringElement | undefined) {
    this.set('bindingVersion', bindingVersion);
  }
}

export default MqttOperationBinding;
