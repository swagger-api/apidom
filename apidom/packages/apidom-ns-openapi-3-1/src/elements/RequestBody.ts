import { Attributes, BooleanElement, Meta, ObjectElement, StringElement } from 'minim';

class RequestBody extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'requestBody';
  }

  get description(): StringElement {
    return this.get('description');
  }

  set description(description: StringElement) {
    this.set('description', description);
  }

  get contentProp(): ObjectElement {
    return this.get('content');
  }

  set contentProp(content: ObjectElement) {
    this.set('content', content);
  }

  get required(): BooleanElement {
    return this.get('required');
  }

  set required(required: BooleanElement) {
    this.set('required', required);
  }
}

export default RequestBody;
