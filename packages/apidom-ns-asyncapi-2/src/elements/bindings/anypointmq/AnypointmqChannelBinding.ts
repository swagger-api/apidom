import { ObjectElement, StringElement, Attributes, Meta } from '@swagger-api/apidom-core';

class AnypointmqChannelBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'anypointmqChannelBinding';
    this.classes.push('channel-binding');
  }

  get destination(): StringElement | undefined {
    return this.get('destination');
  }

  set destination(destination: StringElement | undefined) {
    this.set('destination', destination);
  }

  get destinationType(): StringElement | undefined {
    return this.get('destinationType');
  }

  set destinationType(destinationType: StringElement | undefined) {
    this.set('destinationType', destinationType);
  }

  get bindingVersion(): StringElement | undefined {
    return this.get('bindingVersion');
  }

  set bindingVersion(bindingVersion: StringElement | undefined) {
    this.set('bindingVersion', bindingVersion);
  }
}

export default AnypointmqChannelBinding;
