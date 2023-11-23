import { StringElement, ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

class Reference extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'reference';
    this.classes.push('workflowsSpec-reference');
  }

  get $ref(): StringElement | undefined {
    return this.get('$ref');
  }

  set $ref($ref: StringElement | undefined) {
    this.set('$ref', $ref);
  }

  get value(): StringElement | undefined {
    return this.get('value');
  }

  set value(value: StringElement | undefined) {
    this.set('value', value);
  }
}

export default Reference;
