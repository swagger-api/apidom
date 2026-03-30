import { ObjectElement, StringElement, Attributes, Meta } from '@swagger-api/apidom-core';

import SchemaElement from '../../Schema.ts';

/**
 * @public
 */
class JmsMessageBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'jmsMessageBinding';
    this.classes.push('message-binding');
  }

  get headers(): SchemaElement | undefined {
    return this.get('headers');
  }

  set headers(headers: SchemaElement | undefined) {
    this.set('headers', headers);
  }

  get bindingVersion(): StringElement | undefined {
    return this.get('bindingVersion');
  }

  set bindingVersion(bindingVersion: StringElement | undefined) {
    this.set('bindingVersion', bindingVersion);
  }
}

export default JmsMessageBinding;
