import { Attributes, Meta, ObjectElement } from 'minim';

import MediaType from './MediaType';

class Response extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'response';
  }

  get contentProp(): Record<string, MediaType> {
    return this.get('content');
  }

  set contentProp(contentProp: Record<string, MediaType>) {
    this.set('content', contentProp);
  }
}

export default Response;
