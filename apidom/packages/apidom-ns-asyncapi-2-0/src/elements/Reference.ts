import { Attributes, Meta, ObjectElement, StringElement } from 'minim';

class Reference extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'reference';
    this.classes.push('json-reference');
    this.classes.push('asyncapi-reference');
  }

  get $ref(): StringElement {
    return this.get('$ref');
  }
}

export default Reference;
