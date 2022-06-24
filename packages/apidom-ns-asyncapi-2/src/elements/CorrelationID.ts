import { StringElement, ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

class CorrelationID extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'correlationID';
  }

  get description(): StringElement {
    return this.get('description');
  }

  set description(description: StringElement) {
    this.set('description', description);
  }

  get location(): StringElement {
    return this.get('location');
  }

  set location(location: StringElement) {
    this.set('location', location);
  }
}

export default CorrelationID;
