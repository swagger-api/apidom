import {
  StringElement,
  ObjectElement,
  BooleanElement,
  NumberElement,
  Attributes,
  Meta,
} from '@swagger-api/apidom-core';

class MqttServerBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'mqttServerBinding';
    this.classes.push('server-binding');
  }

  get clientId(): StringElement | undefined {
    return this.get('clientId');
  }

  set clientId(clientId: StringElement | undefined) {
    this.set('clientId', clientId);
  }

  get cleanSession(): BooleanElement | undefined {
    return this.get('cleanSession');
  }

  set cleanSession(cleanSession: BooleanElement | undefined) {
    this.set('cleanSession', cleanSession);
  }

  get lastWill(): ObjectElement | undefined {
    return this.get('lastWill');
  }

  set lastWill(lastWill: ObjectElement | undefined) {
    this.set('lastWill', lastWill);
  }

  get keepAlive(): NumberElement | undefined {
    return this.get('keepAlive');
  }

  set keepAlive(keepAlive: NumberElement | undefined) {
    this.set('keepAlive', keepAlive);
  }

  get bindingVersion(): StringElement | undefined {
    return this.get('bindingVersion');
  }

  set bindingVersion(bindingVersion: StringElement | undefined) {
    this.set('bindingVersion', bindingVersion);
  }
}

export default MqttServerBinding;
