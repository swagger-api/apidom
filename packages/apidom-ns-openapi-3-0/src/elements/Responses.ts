import { ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

import ResponseElement from './Response';
import ReferenceElement from './Reference';

class Responses extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'responses';
  }

  get default(): ResponseElement | ReferenceElement | undefined {
    return this.get('default');
  }

  set default(defaultValue: ResponseElement | ReferenceElement | undefined) {
    this.set('default', defaultValue);
  }
}

export default Responses;
