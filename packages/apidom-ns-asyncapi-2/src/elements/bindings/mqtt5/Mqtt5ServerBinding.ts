import {
  StringElement,
  NumberElement,
  ObjectElement,
  Attributes,
  Meta,
} from '@swagger-api/apidom-core';

import SchemaElement from '../../Schema.ts';
import ReferenceElement from '../../Reference.ts';

/**
 * @public
 */
class Mqtt5ServerBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'mqtt5ServerBinding';
    this.classes.push('server-binding');
  }

  get sessionExpiryInterval(): NumberElement | SchemaElement | ReferenceElement | undefined {
    return this.get('sessionExpiryInterval');
  }

  set sessionExpiryInterval(
    sessionExpiryInterval: NumberElement | SchemaElement | ReferenceElement | undefined,
  ) {
    this.set('sessionExpiryInterval', sessionExpiryInterval);
  }

  get bindingVersion(): StringElement | undefined {
    return this.get('bindingVersion');
  }

  set bindingVersion(bindingVersion: StringElement | undefined) {
    this.set('bindingVersion', bindingVersion);
  }
}

export default Mqtt5ServerBinding;
