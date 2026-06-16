import { StringElement, ObjectElement, Attributes, Meta } from '@swagger-api/apidom-core';

/**
 * @public
 */
class HTTPAuthSecurityScheme extends ObjectElement {
  constructor(content?: Record<string, unknown>, meta?: Meta, attributes?: Attributes) {
    super(content, meta, attributes);
    this.element = 'httpAuthSecurityScheme';
    this.classes.push('http-auth-security-scheme');
  }

  get description(): StringElement | undefined {
    return this.get('description');
  }

  set description(description: StringElement | undefined) {
    this.set('description', description);
  }

  get scheme(): StringElement | undefined {
    return this.get('scheme');
  }

  set scheme(scheme: StringElement | undefined) {
    this.set('scheme', scheme);
  }

  get bearerFormat(): StringElement | undefined {
    return this.get('bearerFormat');
  }

  set bearerFormat(bearerFormat: StringElement | undefined) {
    this.set('bearerFormat', bearerFormat);
  }
}

export default HTTPAuthSecurityScheme;
