import { StringElement, ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

class Reference extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'reference';
    this.classes.push('openapi-reference');
  }

  get $ref(): StringElement {
    return this.get('$ref');
  }
}

Object.defineProperty(Reference.prototype, 'description', {
  get(): StringElement {
    return this.get('description');
  },
  set(description: StringElement) {
    this.set('description', description);
  },
  enumerable: true,
});

Object.defineProperty(Reference.prototype, 'summary', {
  get(): StringElement {
    return this.get('summary');
  },
  set(description: StringElement) {
    this.set('summary', description);
  },
  enumerable: true,
});

export default Reference;
