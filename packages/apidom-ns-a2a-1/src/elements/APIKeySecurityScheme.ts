import { StringElement, ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

/**
 * @public
 */
class APIKeySecurityScheme extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'apiKeySecurityScheme';
    this.classes.push('api-key-security-scheme');
  }

  get description(): StringElement | undefined {
    return this.get('description');
  }

  set description(description: StringElement | undefined) {
    this.set('description', description);
  }

  get name(): StringElement | undefined {
    return this.get('name');
  }

  set name(name: StringElement | undefined) {
    this.set('name', name);
  }

  get location(): StringElement | undefined {
    return this.get('location');
  }

  set location(location: StringElement | undefined) {
    this.set('location', location);
  }
}

export default APIKeySecurityScheme;
