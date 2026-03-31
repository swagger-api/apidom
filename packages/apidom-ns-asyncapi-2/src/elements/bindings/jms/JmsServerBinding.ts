import {
  ObjectElement,
  ArrayElement,
  StringElement,
  Attributes,
  Meta,
} from '@swagger-api/apidom-core';

/**
 * @public
 */
class JmsServerBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'jmsServerBinding';
    this.classes.push('server-binding');
  }

  get jmsConnectionFactory(): StringElement | undefined {
    return this.get('jmsConnectionFactory');
  }

  set jmsConnectionFactory(jmsConnectionFactory: StringElement | undefined) {
    this.set('jmsConnectionFactory', jmsConnectionFactory);
  }

  get properties(): ArrayElement | undefined {
    return this.get('properties');
  }

  set properties(properties: ArrayElement | undefined) {
    this.set('properties', properties);
  }

  get clientID(): StringElement | undefined {
    return this.get('clientID');
  }

  set clientID(clientID: StringElement | undefined) {
    this.set('clientID', clientID);
  }

  get bindingVersion(): StringElement | undefined {
    return this.get('bindingVersion');
  }

  set bindingVersion(bindingVersion: StringElement | undefined) {
    this.set('bindingVersion', bindingVersion);
  }
}

export default JmsServerBinding;
