import { Attributes, Meta, ObjectElement } from 'minim';

class Components extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'components';
  }

  get schemas(): ObjectElement {
    return this.get('schemas');
  }
}

export default Components;
