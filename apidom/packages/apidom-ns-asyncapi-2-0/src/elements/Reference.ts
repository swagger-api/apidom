import { Attributes, Meta, ObjectElement, StringElement } from 'minim';

class Reference extends ObjectElement {
  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'reference';
    this.classes.push('json-reference');
  }

  get $ref(): StringElement {
    return this.get('$ref');
  }
}

export default Reference;
