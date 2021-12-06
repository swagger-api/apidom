import { Attributes, Meta } from 'minim';
import {
  StringElement,
  ObjectElement,
  BooleanElement,
  NumberElement,
} from '@swagger-api/apidom-core';

class MqttServerBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'mqttServerBinding';
    this.classes.push('server-binding');
  }

  get clientId(): StringElement {
    return this.get('clientId');
  }

  set clientId(clientId: StringElement) {
    this.set('clientId', clientId);
  }

  get cleanSession(): BooleanElement {
    return this.get('cleanSession');
  }

  set cleanSession(cleanSession: BooleanElement) {
    this.set('cleanSession', cleanSession);
  }

  get lastWill(): ObjectElement {
    return this.get('lastWill');
  }

  set lastWill(lastWill: ObjectElement) {
    this.set('lastWill', lastWill);
  }

  get keepAlive(): NumberElement {
    return this.get('keepAlive');
  }

  set keepAlive(keepAlive: NumberElement) {
    this.set('keepAlive', keepAlive);
  }

  get bindingVersion(): StringElement {
    return this.get('bindingVersion');
  }

  set bindingVersion(bindingVersion: StringElement) {
    this.set('bindingVersion', bindingVersion);
  }
}

export default MqttServerBinding;
