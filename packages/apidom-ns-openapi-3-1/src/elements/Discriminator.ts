import { StringElement, ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

class Discriminator extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'discriminator';
  }

  get propertyName(): StringElement {
    return this.get('propertyName');
  }

  set propertyName(propertyName: StringElement) {
    this.set('propertyName', propertyName);
  }

  get mapping(): ObjectElement {
    return this.get('mapping');
  }

  set mapping(mapping: ObjectElement) {
    this.set('mapping', mapping);
  }
}

export default Discriminator;
