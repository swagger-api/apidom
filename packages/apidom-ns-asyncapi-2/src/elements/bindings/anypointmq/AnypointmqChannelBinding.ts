import { Attributes, Meta, StringElement } from 'minim';
import { ObjectElement } from '@swagger-api/apidom-core';

class AnypointmqChannelBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'anypointmqChannelBinding';
  }

  get destination(): StringElement {
    return this.get('destination');
  }

  set destination(destination: StringElement) {
    this.set('destination', destination);
  }

  get destinationType(): StringElement {
    return this.get('destinationType');
  }

  set destinationType(destinationType: StringElement) {
    this.set('destinationType', destinationType);
  }

  get bindingVersion(): StringElement {
    return this.get('bindingVersion');
  }

  set bindingVersion(bindingVersion: StringElement) {
    this.set('bindingVersion', bindingVersion);
  }
}

export default AnypointmqChannelBinding;
