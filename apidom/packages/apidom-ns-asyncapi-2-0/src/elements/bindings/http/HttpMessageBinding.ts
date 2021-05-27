import { Attributes, Meta, ObjectElement, StringElement } from 'minim';

import SchemaElement from '../../Schema';

class HttpMessageBinding extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'httpMessageBinding';
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

export default HttpMessageBinding;
