import { StringElement, ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

class Criterion extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'criterion';
  }

  get context(): StringElement | undefined {
    return this.get('context');
  }

  set context(context: StringElement | undefined) {
    this.set('context', context);
  }

  get condition(): StringElement | undefined {
    return this.get('condition');
  }

  set condition(condition: StringElement | undefined) {
    this.set('condition', condition);
  }

  get type(): StringElement | undefined {
    return this.get('type');
  }

  set type(type: StringElement | undefined) {
    this.set('type', type);
  }
}

export default Criterion;
