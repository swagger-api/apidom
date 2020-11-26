import { Attributes, Meta, ObjectElement, StringElement } from 'minim';

class Reference extends ObjectElement {
  constructor(content?: Array<unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'reference';
    this.classes.push('openapi-reference');
  }

  get $ref(): StringElement {
    return this.get('$ref');
  }

  get summary(): StringElement {
    return this.get('summary');
  }

  get description(): StringElement {
    return this.get('description');
  }
}

export default Reference;
