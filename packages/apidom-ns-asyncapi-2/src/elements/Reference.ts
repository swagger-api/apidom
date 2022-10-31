import { StringElement, ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

class Reference extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'reference';
    this.classes.push('json-reference');
    this.classes.push('asyncapi-reference');
  }

  set $ref($ref: StringElement | undefined) {
    this.set('$ref', $ref);
  }

  get $ref(): StringElement | undefined {
    return this.get('$ref');
  }
}

export default Reference;
