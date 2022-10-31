import { StringElement, ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

class CorrelationID extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'correlationID';
  }

  get description(): StringElement | undefined {
    return this.get('description');
  }

  set description(description: StringElement | undefined) {
    this.set('description', description);
  }

  get location(): StringElement | undefined {
    return this.get('location');
  }

  set location(location: StringElement | undefined) {
    this.set('location', location);
  }
}

export default CorrelationID;
