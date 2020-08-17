import { Attributes, Meta, ObjectElement } from 'minim';

class Components extends ObjectElement {
  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'components';
    this.classes.push('components');
  }

  get schemas(): ObjectElement {
    return this.get('schemas');
  }
}

export default Components;
