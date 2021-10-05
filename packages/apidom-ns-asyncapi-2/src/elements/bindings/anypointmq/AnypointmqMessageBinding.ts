import { Attributes, Meta } from 'minim';
import { ObjectElement, StringElement } from '@swagger-api/apidom-core';

import SchemaElement from '../../Schema';

class AnypointmqMessageBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'anypointmqMessageBinding';
  }

  get headers(): SchemaElement {
    return this.get('headers');
  }

  set headers(headers: SchemaElement) {
    this.set('headers', headers);
  }

  get bindingVersion(): StringElement {
    return this.get('bindingVersion');
  }

  set bindingVersion(bindingVersion: StringElement) {
    this.set('bindingVersion', bindingVersion);
  }
}

export default AnypointmqMessageBinding;
