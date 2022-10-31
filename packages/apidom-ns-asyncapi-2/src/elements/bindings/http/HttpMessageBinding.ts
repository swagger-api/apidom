import { StringElement, ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

import SchemaElement from '../../Schema';
import ReferenceElement from '../../Reference';

class HttpMessageBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'httpMessageBinding';
    this.classes.push('message-binding');
  }

  get headers(): SchemaElement | ReferenceElement | undefined {
    return this.get('headers');
  }

  set headers(headers: SchemaElement | ReferenceElement | undefined) {
    this.set('headers', headers);
  }

  get bindingVersion(): StringElement | undefined {
    return this.get('bindingVersion');
  }

  set bindingVersion(bindingVersion: StringElement | undefined) {
    this.set('bindingVersion', bindingVersion);
  }
}

export default HttpMessageBinding;
