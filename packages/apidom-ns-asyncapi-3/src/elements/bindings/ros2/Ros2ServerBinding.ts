import {
  StringElement,
  NumberElement,
  ObjectElement,
  Attributes,
  Meta,
} from '@swagger-api/apidom-core';

/**
 * @public
 */
class Ros2ServerBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'ros2ServerBinding';
    this.classes.push('server-binding');
  }

  get rmwImplementation(): StringElement | undefined {
    return this.get('rmwImplementation');
  }

  set rmwImplementation(rmwImplementation: StringElement | undefined) {
    this.set('rmwImplementation', rmwImplementation);
  }

  get domainId(): NumberElement | undefined {
    return this.get('domainId');
  }

  set domainId(domainId: NumberElement | undefined) {
    this.set('domainId', domainId);
  }

  get bindingVersion(): StringElement | undefined {
    return this.get('bindingVersion');
  }

  set bindingVersion(bindingVersion: StringElement | undefined) {
    this.set('bindingVersion', bindingVersion);
  }
}

export default Ros2ServerBinding;
