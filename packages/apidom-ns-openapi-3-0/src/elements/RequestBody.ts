import {
  StringElement,
  ObjectElement,
  BooleanElement,
  Attributes,
  Meta,
} from '@swagger-api/apidom-core';

class RequestBody extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'requestBody';
  }

  get description(): StringElement | undefined {
    return this.get('description');
  }

  set description(description: StringElement | undefined) {
    this.set('description', description);
  }

  get contentProp(): ObjectElement | undefined {
    return this.get('content');
  }

  set contentProp(content: ObjectElement | undefined) {
    this.set('content', content);
  }

  get required(): BooleanElement | undefined {
    return this.get('required');
  }

  set required(required: BooleanElement | undefined) {
    this.set('required', required);
  }
}

export default RequestBody;
